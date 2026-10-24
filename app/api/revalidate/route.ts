import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * Sanity publish webhook. Configure it at sanity.io/manage > API > Webhooks:
 *   URL:      https://<your-domain>/api/revalidate
 *   Trigger:  create, update, delete
 *   Secret:   the value of SANITY_REVALIDATE_SECRET in .env.local
 *   Projection (optional): {_type}
 * Every page is re-rendered on its next request, so an edit is live within seconds.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 });

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
    if (!isValidSignature) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });

    revalidateTag('sanity', { expire: 0 });
    revalidatePath('/', 'layout');
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
  } catch (err) {
    console.error('[revalidate]', err);
    return NextResponse.json({ error: 'Could not process the webhook' }, { status: 500 });
  }
}
