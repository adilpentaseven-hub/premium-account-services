import type { Access } from 'payload'

export const anyone: Access = () => true
export const authenticated: Access = ({ req }) => Boolean(req.user)

export const ownerOrAdmin: Access = ({ req }) => {
  const role = (req.user as { role?: string } | null | undefined)?.role
  return role === 'owner' || role === 'admin'
}

export const approvedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return {
    status: {
      equals: 'approved',
    },
  }
}
