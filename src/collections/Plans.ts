import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access'

export const Plans: CollectionConfig = {
  slug: 'plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'provider', 'serviceCategory', 'promotionalPrice', 'downloadSpeed', 'status'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'provider', type: 'relationship', relationTo: 'providers', required: true, index: true },
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'internalPlanID', type: 'text' },
    {
      name: 'serviceCategory',
      type: 'select',
      required: true,
      options: ['internet', 'fiber', 'tv', 'mobile', 'bundle', 'business'],
    },
    {
      name: 'technology',
      type: 'select',
      options: ['fiber', 'cable', 'dsl', '5g-home', 'fixed-wireless', 'satellite', 'other'],
    },
    { name: 'downloadSpeed', type: 'number', admin: { description: 'Mbps' } },
    { name: 'uploadSpeed', type: 'number', admin: { description: 'Mbps' } },
    { name: 'regularPrice', type: 'number' },
    { name: 'promotionalPrice', type: 'number' },
    { name: 'promotionalPeriod', type: 'text' },
    { name: 'priceAfterPromotion', type: 'number' },
    { name: 'autopayRequired', type: 'checkbox', defaultValue: false },
    { name: 'contractLength', type: 'text' },
    { name: 'dataAllowance', type: 'text' },
    { name: 'equipmentCost', type: 'number' },
    { name: 'installationCost', type: 'number' },
    { name: 'activationCost', type: 'number' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: ['active', 'inactive', 'expired'],
    },
    { name: 'offerStartDate', type: 'date' },
    { name: 'offerExpirationDate', type: 'date' },
    { name: 'lastVerifiedDate', type: 'date' },
    { name: 'callToActionPhone', type: 'text' },
    { name: 'disclaimer', type: 'textarea', required: true },
  ],
}
