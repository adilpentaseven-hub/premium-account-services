import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access'

export const Providers: CollectionConfig = {
  slug: 'providers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'startingPrice', 'maxDownloadSpeed', 'status', 'lastVerifiedDate'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true, index: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'legalName', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'overview', type: 'richText' },
    { name: 'salesPhone', type: 'text' },
    { name: 'providerWebsite', type: 'text' },
    {
      name: 'connectionTypes',
      type: 'select',
      hasMany: true,
      options: ['fiber', 'cable', 'dsl', '5g-home', 'fixed-wireless', 'satellite'],
    },
    { name: 'maxDownloadSpeed', type: 'number', admin: { description: 'Mbps' } },
    { name: 'maxUploadSpeed', type: 'number', admin: { description: 'Mbps' } },
    { name: 'startingPrice', type: 'number', admin: { description: 'Monthly price in USD' } },
    { name: 'contractRequired', type: 'checkbox', defaultValue: false },
    { name: 'dataCapSummary', type: 'text' },
    {
      name: 'availableServices',
      type: 'select',
      hasMany: true,
      options: ['internet', 'fiber', 'tv', 'mobile', 'bundles', 'business'],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: ['active', 'inactive', 'coming-soon'],
    },
    { name: 'disclosure', type: 'textarea' },
    { name: 'lastVerifiedDate', type: 'date' },
    { name: 'lastReviewedDate', type: 'date' },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', maxLength: 60 },
        { name: 'description', type: 'textarea', maxLength: 160 },
        { name: 'canonicalURL', type: 'text' },
      ],
    },
  ],
}
