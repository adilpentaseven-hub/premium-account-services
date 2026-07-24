import type { CollectionConfig } from 'payload'
import { ownerOrAdmin } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    read: ownerOrAdmin,
    update: ({ req, id }) => {
      if (!req.user) return false
      const role = (req.user as { role?: string }).role
      if (role === 'owner' || role === 'admin') return true
      return req.user.id === id
    },
    delete: ownerOrAdmin,
    create: async ({ req }) => {
      if (req.user) {
        const role = (req.user as { role?: string }).role
        return role === 'owner' || role === 'admin'
      }
      const existing = await req.payload.find({ collection: 'users', limit: 0 })
      return existing.totalDocs === 0
    },
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Owner', value: 'owner' },
        { label: 'Administrator', value: 'admin' },
        { label: 'Pricing Manager', value: 'pricing-manager' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
        { label: 'Reviewer', value: 'reviewer' }
      ],
    },
  ],
}
