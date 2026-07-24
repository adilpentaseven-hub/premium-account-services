import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access'

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  admin: { useAsTitle: 'name' },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'provider', type: 'relationship', relationTo: 'providers', required: true },
    { name: 'eligiblePlans', type: 'relationship', relationTo: 'plans', hasMany: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'promotionType', type: 'select', options: ['discount', 'gift-card', 'free-installation', 'bundle', 'other'] },
    { name: 'value', type: 'number' },
    { name: 'eligibilityRules', type: 'textarea' },
    { name: 'requiredDisclaimer', type: 'textarea' },
    { name: 'startDate', type: 'date' },
    { name: 'expirationDate', type: 'date' },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'source', type: 'text' },
    { name: 'lastVerifiedDate', type: 'date' },
  ],
}
