import { randomUUID } from 'node:crypto';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, sanityEnabled } from '@/sanity/env';

/**
 * Saves contact form submissions to Sanity, where they appear in the studio under
 * Enquiries. Import it only from server code (app/api/contact): it uses the write token,
 * which is not NEXT_PUBLIC_ and so is never sent to the browser.
 *
 * Each id starts with "enquiry." On a public dataset Sanity only returns documents with
 * a dotted id to signed-in users and tokens, so names, emails and messages stay private
 * even though the rest of the content is publicly readable.
 */

const token = process.env.SANITY_API_WRITE_TOKEN;
const writer = sanityEnabled && token ? createClient({ projectId, dataset, apiVersion, token, useCdn: false }) : null;

export class EnquiryStoreConfigError extends Error {}

export type EnquiryInput = {
  division: 'education' | 'marketing' | 'general';
  name: string;
  email: string;
  phone: string;
  message: string;
  emailSent: boolean;
};

export async function saveEnquiry(input: EnquiryInput): Promise<string> {
  if (!writer) throw new EnquiryStoreConfigError('NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN must be set to store enquiries.');
  const doc = await writer.create({
    _id: `enquiry.${randomUUID()}`,
    _type: 'enquiry',
    status: 'new',
    division: input.division,
    name: input.name,
    email: input.email,
    phone: input.phone || undefined,
    message: input.message,
    emailSent: input.emailSent,
    submittedAt: new Date().toISOString(),
  });
  return doc._id;
}
