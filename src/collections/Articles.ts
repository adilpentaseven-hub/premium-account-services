import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: { useAsTitle: 'title' },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    { name: 'relatedProviders', type: 'relationship', relationTo: 'providers', hasMany: true },
    { name: 'relatedPlans', type: 'relationship', relationTo: 'plans', hasMany: true },
    { name: 'publishedDate', type: 'date' },
    { name: 'updatedDate', type: 'date' },
    { name: 'lastReviewedDate', type: 'date' },
    { name: 'publishStatus', type: 'select', defaultValue: 'draft', options: ['draft', 'published'] },
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
