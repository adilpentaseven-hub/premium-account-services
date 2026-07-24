import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access'

export const ServiceAreas: CollectionConfig = {
  slug: 'service-areas',
  admin: { useAsTitle: 'zipCode' },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'provider', type: 'relationship', relationTo: 'providers', required: true, index: true },
    { name: 'plan', type: 'relationship', relationTo: 'plans', index: true },
    { name: 'state', type: 'text', required: true },
    { name: 'city', type: 'text' },
    { name: 'zipCode', type: 'text', required: true, index: true, maxLength: 5 },
    { name: 'technology', type: 'select', options: ['fiber', 'cable', 'dsl', '5g-home', 'fixed-wireless', 'satellite'] },
    { name: 'availabilityConfidence', type: 'select', defaultValue: 'estimated', options: ['confirmed', 'estimated', 'limited'] },
    { name: 'dataSource', type: 'text' },
    { name: 'effectiveDate', type: 'date' },
    { name: 'expirationDate', type: 'date' },
    { name: 'lastVerifiedDate', type: 'date' },
  ],
}
