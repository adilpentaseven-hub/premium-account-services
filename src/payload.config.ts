import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Providers } from '@/collections/Providers'
import { Plans } from '@/collections/Plans'
import { Promotions } from '@/collections/Promotions'
import { Locations } from '@/collections/Locations'
import { ServiceAreas } from '@/collections/ServiceAreas'
import { Articles } from '@/collections/Articles'
import { Leads } from '@/collections/Leads'
import { Reviews } from '@/collections/Reviews'
import { SiteSettings } from '@/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000')

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || 'development-secret-change-me',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | Premium Account Services',
    },
  },
  collections: [
    Users,
    Media,
    Providers,
    Plans,
    Promotions,
    Locations,
    ServiceAreas,
    Articles,
    Leads,
    Reviews,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: 5,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    },
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  cors: [serverURL],
  csrf: [serverURL],
})
