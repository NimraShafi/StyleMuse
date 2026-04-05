# style-muse-ecommerce-website

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_QMQYRp7ZN51f5b4Utx2dLZ1eAXFc)

## Setup

### Environment Variables

Create a `.env.local` file in the root directory and add your API keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend (for email functionality)
RESEND_API_KEY=your_resend_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Contact Information
CONTACT_EMAIL=hello@stylemuse.com
COMPANY_NAME=Style Muse
```

### Database Setup

Run the following SQL scripts in your Supabase SQL Editor:

1. **Products table:**
```sql
CREATE TABLE products (id SERIAL PRIMARY KEY, slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL, price TEXT NOT NULL, price_num INTEGER NOT NULL, image TEXT NOT NULL, images TEXT[] NOT NULL, tag TEXT NOT NULL, category TEXT NOT NULL, colors TEXT[] NOT NULL, sizes TEXT[] NOT NULL, description TEXT NOT NULL, details TEXT[] NOT NULL);
```

2. **Contact submissions table:**
```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Email Setup (Resend)

1. Sign up at [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file
4. Verify your domain in Resend (use `stylemuse.com` or your actual domain)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

- 🛍️ E-commerce functionality with product catalog
- 📧 Contact form with automatic email confirmation
- 🎨 Custom themed UI components
- 📱 Responsive design
- 🔒 Secure form submissions with database storage

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/NimraShafi/style-muse-ecommerce-website" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
