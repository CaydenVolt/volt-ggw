/// <reference types="@cloudflare/workers-types" />
/**
 * Cloudflare Pages Function — POST /api/lead
 *
 * Receives a lead from the EstimateForm, upserts a contact in GoHighLevel,
 * and creates an opportunity in the sales pipeline.
 */

/* ── Types ─────────────────────────────────────────────────────────────── */

interface LeadBody {
  fullName: string;
  phone: string;
  email: string;
  message?: string;
  consentGiven: boolean;
  submitted_at?: string;
  // Attribution / UTM
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  page_url?: string;
  referrer?: string;
}

interface Env {
  GHL_API_TOKEN: string;
  GHL_LOCATION_ID: string;
}

interface GHLContact {
  id: string;
  locationId: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

/* ── Constants ─────────────────────────────────────────────────────────── */

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const PIPELINE_ID = 'CYVhEzk6PBlcRF4miNkS';
const STAGE_ID = 'c4a0643a-52d4-4465-bae5-252ec630a259';

/* ── Helpers ───────────────────────────────────────────────────────────── */

function ghlHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Version: GHL_VERSION,
  };
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  return { firstName, lastName };
}

/** Search for an existing contact by email, then by phone. */
async function findContact(
  email: string,
  phone: string,
  locationId: string,
  token: string,
): Promise<GHLContact | null> {
  const headers = ghlHeaders(token);

  // Try email first
  const emailParams = new URLSearchParams({ locationId, email });
  const emailRes = await fetch(
    `${GHL_BASE}/contacts/search/duplicate?${emailParams}`,
    { headers },
  );
  if (emailRes.ok) {
    const data = (await emailRes.json()) as { contact?: GHLContact };
    if (data.contact?.id) return data.contact;
  }

  // Fall back to phone
  const phoneParams = new URLSearchParams({ locationId, number: phone });
  const phoneRes = await fetch(
    `${GHL_BASE}/contacts/search/duplicate?${phoneParams}`,
    { headers },
  );
  if (phoneRes.ok) {
    const data = (await phoneRes.json()) as { contact?: GHLContact };
    if (data.contact?.id) return data.contact;
  }

  return null;
}

async function createContact(
  body: LeadBody,
  locationId: string,
  token: string,
): Promise<GHLContact> {
  const { firstName, lastName } = splitName(body.fullName);
  const res = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers: ghlHeaders(token),
    body: JSON.stringify({
      locationId,
      firstName,
      lastName,
      email: body.email,
      phone: body.phone,
      tags: ['website_form'],
      source: 'website_form',
      customFields: buildCustomFields(body),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL create contact ${res.status}: ${text}`);
  }
  const data = (await res.json()) as { contact: GHLContact };
  return data.contact;
}

async function updateContact(
  contactId: string,
  body: LeadBody,
  token: string,
): Promise<void> {
  const { firstName, lastName } = splitName(body.fullName);
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
    method: 'PUT',
    headers: ghlHeaders(token),
    body: JSON.stringify({
      firstName,
      lastName,
      email: body.email,
      phone: body.phone,
      customFields: buildCustomFields(body),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL update contact ${res.status}: ${text}`);
  }
}

function buildCustomFields(body: LeadBody): Array<{ key: string; field_value: string }> {
  const now = new Date().toISOString();
  const pairs: Array<[string, string | undefined]> = [
    ['utm_source', body.utm_source],
    ['utm_medium', body.utm_medium],
    ['utm_campaign', body.utm_campaign],
    ['utm_content', body.utm_content],
    ['utm_term', body.utm_term],
    ['gclid', body.gclid],
    ['fbclid', body.fbclid],
    ['page_url', body.page_url],
    ['referrer', body.referrer],
    ['lead_source', 'website_form'],
    ['consent_timestamp', now],
    ['project_description', body.message],
  ];
  return pairs
    .filter((p): p is [string, string] => !!p[1])
    .map(([key, field_value]) => ({ key, field_value }));
}

async function createOpportunity(
  contactId: string,
  contactName: string,
  locationId: string,
  token: string,
): Promise<void> {
  const res = await fetch(`${GHL_BASE}/opportunities/`, {
    method: 'POST',
    headers: ghlHeaders(token),
    body: JSON.stringify({
      pipelineId: PIPELINE_ID,
      pipelineStageId: STAGE_ID,
      locationId,
      contactId,
      name: contactName,
      status: 'open',
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    // The pipeline disallows duplicates: a returning contact already has an
    // opportunity. The contact was updated above, so the lead is not lost.
    if (res.status === 400 && text.includes('OPPORTUNITY_NO_DUPLICATE')) {
      console.log(`[lead] Contact ${contactId} already has an opportunity, skipped creating another.`);
      return;
    }
    throw new Error(`GHL create opportunity ${res.status}: ${text}`);
  }
}

/* ── Validation ────────────────────────────────────────────────────────── */

function validate(body: unknown): { ok: true; data: LeadBody } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Request body must be JSON.' };
  }
  const b = body as Record<string, unknown>;

  const fullName = String(b.fullName || '').trim();
  if (!fullName) return { ok: false, error: 'fullName is required.' };

  const phone = String(b.phone || '').trim();
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) return { ok: false, error: 'A valid phone number is required.' };

  const email = String(b.email || '').trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: 'A valid email is required.' };

  if (b.consentGiven !== true && b.consentGiven !== 'true') {
    return { ok: false, error: 'Consent is required.' };
  }

  return {
    ok: true,
    data: {
      fullName,
      phone,
      email,
      message: b.message ? String(b.message).trim() : undefined,
      consentGiven: true,
      submitted_at: b.submitted_at ? String(b.submitted_at) : undefined,
      utm_source: b.utm_source ? String(b.utm_source) : undefined,
      utm_medium: b.utm_medium ? String(b.utm_medium) : undefined,
      utm_campaign: b.utm_campaign ? String(b.utm_campaign) : undefined,
      utm_content: b.utm_content ? String(b.utm_content) : undefined,
      utm_term: b.utm_term ? String(b.utm_term) : undefined,
      gclid: b.gclid ? String(b.gclid) : undefined,
      fbclid: b.fbclid ? String(b.fbclid) : undefined,
      page_url: b.page_url ? String(b.page_url) : undefined,
      referrer: b.referrer ? String(b.referrer) : undefined,
    },
  };
}

/* ── Handler ───────────────────────────────────────────────────────────── */

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON.' },
      { status: 400, headers: corsHeaders },
    );
  }

  const result = validate(body);
  if (!result.ok) {
    return Response.json(
      { success: false, error: result.error },
      { status: 400, headers: corsHeaders },
    );
  }

  const lead = result.data;
  const token = env.GHL_API_TOKEN;
  const locationId = env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.error('[lead] Missing GHL_API_TOKEN or GHL_LOCATION_ID env vars.');
    return Response.json(
      { success: false, error: 'Server configuration error.' },
      { status: 500, headers: corsHeaders },
    );
  }

  try {
    // 1. Find or create contact
    let contact = await findContact(lead.email, lead.phone, locationId, token);

    if (contact) {
      await updateContact(contact.id, lead, token);
      console.log(`[lead] Updated existing contact ${contact.id}`);
    } else {
      contact = await createContact(lead, locationId, token);
      console.log(`[lead] Created new contact ${contact.id}`);
    }

    // 2. Create opportunity
    await createOpportunity(contact.id, lead.fullName, locationId, token);
    console.log(`[lead] Created opportunity for contact ${contact.id}`);

    return Response.json({ success: true }, { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('[lead] GHL API failure. Lead payload:', JSON.stringify(lead));
    console.error('[lead] Error:', err instanceof Error ? err.message : err);
    return Response.json(
      { success: false, error: 'Failed to process your request. Please try again or call us directly.' },
      { status: 500, headers: corsHeaders },
    );
  }
};
