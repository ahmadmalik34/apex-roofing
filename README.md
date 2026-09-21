# Apex Roofing

A Next.js 16 roofing website with a hidden admin dashboard for managing site branding, colours, watermark, and contact button — all backed by **Neon PostgreSQL** via **Prisma ORM**.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Neon PostgreSQL

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Go to **Connection Details** and copy the two connection strings

Create a `.env.local` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Fill in your Neon credentials:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require&pgbouncer=true&connect_timeout=15"
DIRECT_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require"
```

- `DATABASE_URL` — the **pooled** connection string (with `?pgbouncer=true`)
- `DIRECT_URL` — the **direct** connection string (without pgbouncer)

### 3. Push the schema and seed

```bash
npm run db:push    # Creates the SiteConfig table in Neon
npm run db:seed    # Inserts the default row
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.  
Open [http://localhost:3000/admin-dashboard](http://localhost:3000/admin-dashboard) for the hidden admin panel.

---

## Admin Dashboard (`/admin-dashboard`)

This page is **not linked anywhere on the public site**. Access it directly by URL.

### What you can change:

| Setting | Description |
|---|---|
| **Company Name** | Replaces "apex" everywhere — header logo, footer |
| **Logo** | Upload a custom image (stored as base64 in the DB) |
| **Primary Colour** | Changes the orange accent colour across the whole site — buttons, icons, highlights |
| **Watermark** | Toggle diagonal "Velmora Softlab" text over every page to protect your design |
| **Watermark Text** | Customise the watermark text |
| **Contact Button Label** | Text shown on the nav header button |
| **Contact Button Email** | The `mailto:` address the button links to |

All changes save instantly to Neon PostgreSQL and revalidate the public pages.

---

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables in **Vercel → Project → Settings → Environment Variables**:
   - `DATABASE_URL` → pooled Neon connection string
   - `DIRECT_URL` → direct Neon connection string
4. Deploy

After first deploy, run the seed once (locally with `DIRECT_URL` pointing to production):
```bash
npm run db:seed
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Sync Prisma schema to Neon (no migration files) |
| `npm run db:seed` | Insert default SiteConfig row |
| `npm run db:studio` | Open Prisma Studio GUI |
