import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: { useAsTitle: 'displayName' },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'displayName', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'locationType', type: 'select', required: true, options: ['state', 'city', 'county', 'zip'] },
    { name: 'state', type: 'text', required: true },
    { name: 'stateAbbreviation', type: 'text', required: true, maxLength: 2 },
    { name: 'city', type: 'text' },
    { name: 'county', type: 'text' },
    { name: 'zipCodes', type: 'array', fields: [{ name: 'zip', type: 'text', required: true, maxLength: 5 }] },
    { name: 'availableProviders', type: 'relationship', relationTo: 'providers', hasMany: true },
    { name: 'introduction', type: 'richText' },
    { name: 'publishStatus', type: 'select', defaultValue: 'draft', options: ['draft', 'published'] },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', maxLength: 60 },
        { name: 'description', type: 'textarea', maxLength: 160 },
      ],
    },
  ],
}
