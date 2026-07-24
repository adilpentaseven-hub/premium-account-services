# Premium Account Services Starter

A custom Next.js + Payload CMS + Supabase/Postgres foundation for an internet, TV, mobile and home-services comparison platform.

## Included

- Next.js 15 App Router website
- Payload CMS admin dashboard at `/admin`
- Supabase/Postgres database adapter
- Provider, plan, promotion, location and service-area collections
- Article, review and lead collections
- ZIP results page
- Public lead form
- Vercel Blob-ready media collection
- Basic SEO metadata, sitemap and robots file
- Responsive homepage and provider templates

## Security first

Never commit `.env` files or paste credentials into chat, tickets or GitHub. If a credential has been exposed, rotate it before deploying.

## Vercel environment variables

Add these in **Vercel → Project → Settings → Environment Variables**:

1. `DATABASE_URL` — copy the new Session Pooler URI from Supabase after resetting the database password.
2. `PAYLOAD_SECRET` — a new random value of at least 32 characters.
3. `NEXT_PUBLIC_SERVER_URL` — optional on the first deployment because the app can use Vercel's production URL automatically. Add your custom domain here later.
4. `PAYLOAD_DB_PUSH` — set to `true` for the first bootstrap only.
5. `BLOB_READ_WRITE_TOKEN` — Vercel creates this after Blob Storage is connected.

## First deployment

1. Upload all files to the empty GitHub repository root.
2. Import the repository into Vercel.
3. Add the environment variables above for Production, Preview and Development.
4. Deploy.
5. Visit `/admin` and create the first owner account.
6. Add one provider, then one plan, then one service-area ZIP.
7. Test `/results?zip=10001` using the ZIP you entered.

## Database workflow warning

`PAYLOAD_DB_PUSH=true` lets Payload/Drizzle synchronize the schema during the bootstrap phase. This is useful for an empty development database but is not the final production migration workflow. Once the initial schema is stable, create and commit migrations, run them during deployment, then set `PAYLOAD_DB_PUSH=false`.

## Demo data

The visible AT&T, Spectrum and Viasat plan values are illustrative fallbacks only. They are deliberately labelled as placeholders. Replace them with authorized and recently verified provider information before public launch or advertising.

## Local development for a developer later

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
