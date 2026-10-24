import { defineField, defineType } from 'sanity';

export const DIVISION_LABELS: Record<string, string> = {
  education: 'Uexora Education',
  marketing: 'Uexora Marketing Studio',
  general: 'General enquiry',
};

const STATUS_LABELS: Record<string, string> = { new: 'New', replied: 'Replied', closed: 'Closed' };

/**
 * A message sent through the contact form. Created by app/api/contact (never in the
 * studio). Its id starts with "enquiry." so the public API cannot read it: Sanity only
 * returns documents with a dotted id to signed-in users and tokens. Only the status can
 * be changed here; the submitted details are read-only.
 */
export const enquiry = defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: Object.entries(STATUS_LABELS).map(([value, title]) => ({ value, title })), layout: 'radio', direction: 'horizontal' },
      initialValue: 'new',
      description: 'Mark it as replied once someone has answered, so the team knows it is handled.',
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', readOnly: true }),
    defineField({
      name: 'division',
      title: 'Division',
      type: 'string',
      readOnly: true,
      options: { list: Object.entries(DIVISION_LABELS).map(([value, title]) => ({ value, title })) },
    }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 8, readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Received', type: 'datetime', readOnly: true }),
    defineField({
      name: 'emailSent',
      title: 'Email notification sent',
      type: 'boolean',
      readOnly: true,
      description: 'Whether the enquiry was also emailed to the division inbox when it arrived.',
    }),
    defineField({ name: 'notes', title: 'Internal notes', type: 'text', rows: 3, description: 'Only visible here, never sent to the visitor.' }),
  ],
  orderings: [{ title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: {
    select: { name: 'name', email: 'email', division: 'division', status: 'status', date: 'submittedAt' },
    prepare: ({ name, email, division, status, date }) => {
      const when = date ? new Date(date).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
      return {
        title: `${status === 'new' ? '● ' : ''}${name || email || 'Enquiry'}`,
        subtitle: [DIVISION_LABELS[division] || division, when, STATUS_LABELS[status] || status].filter(Boolean).join(' · '),
      };
    },
  },
});
