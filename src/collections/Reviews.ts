import type { CollectionConfig } from 'payload'
import { approvedOrAuthenticated, authenticated } from '@/access'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: { useAsTitle: 'reviewerName' },
  access: {
    create: () => true,
    read: approvedOrAuthenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'provider', type: 'relationship', relationTo: 'providers', required: true },
    { name: 'reviewerName', type: 'text', required: true },
    { name: 'rating', type: 'number', required: true, min: 1, max: 5 },
    { name: 'reviewText', type: 'textarea', required: true },
    { name: 'serviceLocation', type: 'text' },
    { name: 'verified', type: 'checkbox', defaultValue: false },
    { name: 'consentAccepted', type: 'checkbox', required: true },
    { name: 'status', type: 'select', defaultValue: 'pending', options: ['pending', 'approved', 'rejected'] },
  ],
}
