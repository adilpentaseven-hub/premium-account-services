import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true, update: authenticated },
  fields: [
    { name: 'companyName', type: 'text', required: true, defaultValue: 'Premium Account Services' },
    { name: 'primaryPhone', type: 'text', required: true, defaultValue: '833-492-8778' },
    { name: 'businessHours', type: 'text', defaultValue: 'Mon–Sat, 8 AM–9 PM ET' },
    { name: 'headerMessage', type: 'text', defaultValue: 'Compare internet, TV and mobile plans available near you.' },
    { name: 'defaultSEOTitle', type: 'text', defaultValue: 'Premium Account Services | Compare Internet and TV Plans' },
    { name: 'defaultSEODescription', type: 'textarea' },
    { name: 'advertisingDisclosure', type: 'textarea' },
    { name: 'footerText', type: 'textarea' },
  ],
}
