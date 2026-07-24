import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'phone',
    defaultColumns: ['firstName', 'phone', 'zipCode', 'selectedProvider', 'leadStatus', 'createdAt'],
  },
  access: {
    create: () => true,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text' },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'streetAddress', type: 'text' },
    { name: 'city', type: 'text' },
    { name: 'state', type: 'text' },
    { name: 'zipCode', type: 'text', required: true, maxLength: 5 },
    { name: 'selectedProvider', type: 'relationship', relationTo: 'providers' },
    { name: 'selectedPlan', type: 'relationship', relationTo: 'plans' },
    { name: 'preferredService', type: 'select', options: ['internet', 'fiber', 'tv', 'mobile', 'bundle', 'business'] },
    { name: 'leadSource', type: 'text' },
    { name: 'landingPage', type: 'text' },
    { name: 'googleClickID', type: 'text' },
    { name: 'consentAccepted', type: 'checkbox', required: true },
    { name: 'consentTimestamp', type: 'date', required: true },
    { name: 'consentLanguage', type: 'textarea', required: true },
    { name: 'leadStatus', type: 'select', defaultValue: 'new', options: ['new', 'contacted', 'qualified', 'converted', 'closed'] },
    { name: 'notes', type: 'textarea' },
  ],
}
