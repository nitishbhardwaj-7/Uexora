/** Default content for the contact page (fallback and seed for the Sanity `contactPage` document). */
export const contact = {
  seo: {
    title: 'Contact UEXORA — Education and Marketing Enquiries',
    description: 'Contact Uexora Education about programmes and learning support, or Uexora Marketing Studio about your business. Share a few details; the right team replies.',
  },
  title: 'Tell us what you’re working towards.',
  lead:
    'A learner’s goals or a business’s next stage: choose the division, share a few details, and your message goes straight to the right team.',
  formHeading: 'Send a message',
  formNote: 'We reply by email, and your details are used only to answer your enquiry.',
};

export type ContactContent = typeof contact;
