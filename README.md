# Madni Public School — Official Web Platform & Management Portal

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black.svg)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%20API-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2B%20Mongoose-brightgreen.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

A high-performance, mobile-first, production-ready website and administrative dashboard built for **Madni Public School**, an established educational institution (Classes 1 to 8) located in **Madni Town, near Shah Alam Abad, D.I. Khan, Khyber Pakhtunkhwa, Pakistan**.

---

## 🏛️ Institutional Overview

- **Institution:** Madni Public School
- **Motto / Subheading:** Building Knowledge, Character & A Brighter Future
- **Academic Wing:** Classes 1 through 8 (Primary & Middle wings)
- **Heritage:** 23 Years of Educational Excellence (Established 2001)
- **Location:** Madni Town, near Shah Alam Abad, Dera Ismail Khan (D.I. Khan), KPK, Pakistan
- **Admission Helpline:** `+92 318 9969994` / `0318-9969994` (Direct Tap-to-Call & WhatsApp)
- **Administrative Portal:** `/admin` (Protected JWT Authentication)

---

## 🚀 Key Features

### Public Portal (Next.js 14 App Router)
- **Sticky Header & Fast Mobile Nav:** Responsive navigation (`Home`, `About`, `Academics`, `Activities`, `Gallery`, `Admissions`, `Contact`) with a prominent "Admissions" call-to-action button, mobile slide-over drawer, and escape key handling.
- **Hero Showcase:** High-impact institutional hero displaying official branding, "23 Years of Excellence" trust badge, institutional metrics, school building visualization, and dual primary actions.
- **About & Philosophy:** Comprehensive institutional mission emphasizing scholastic rigor, moral character, discipline, and confident expression.
- **Academics (Classes 1–8):** Modular wings for Primary Classes (1–5) and Middle Classes (6–8) detailing curriculum highlights, foundational skills, and student-centered methodology.
- **Why Choose Us:** 6 key institutional pillars with clean icon cards (Quality Education, Experienced Teachers, Safe Environment, Character Building, Modern Approach, Student Development).
- **Activities & Campus Gallery:** Dynamic image grid with real-time category filtering (`Classroom`, `Learning`, `Events`, `Prize Distribution`, `Sports`, `School Building`) and an accessible keyboard-navigable lightbox with touch-swipe support.
- **Achievements & Events:** Dedicated cards for annual ceremonies, prize distributions, and academic activities.
- **Administration Message:** Formal greeting from the school leadership detailing educational philosophy and community partnership.
- **Admissions Open Banner:** High-conversion admission callout with instant WhatsApp tap-to-chat integration.
- **Contact & Location:** Interactive Google Maps embed placeholder, office hours, verified contact numbers, and a secure admission inquiry form.
- **Dedicated Gallery Route (`/gallery`):** Complete campus photo archive with category filtering and lightbox inspection.
- **Custom 404 Error Page (`/not-found`):** User-friendly fallback with quick links and direct admission helpline.
- **Floating Communication Dock:** Sticky WhatsApp click-to-chat button on desktop and fixed mobile quick-action bar with direct calling.

### Backend & Security Architecture (Node.js / Express)
- **RESTful API v1:** Fully versioned endpoints (`/api/v1/contact`, `/api/v1/gallery`, `/api/v1/events`, `/api/v1/auth`, `/api/v1/admin`).
- **Security Hardening:** Helmet HTTP headers, CORS origin allowlisting, rate limiting (anti-abuse for contact submissions and auth attempts), Mongo query sanitization.
- **Spam Protection:** Client + server honeypot trapping automated bots without annoying captchas.
- **Admin Authentication:** Secure JWT signed tokens stored in `httpOnly`, `SameSite=Lax`, `secure` cookies with bcrypt password hashing (12 salt rounds).
- **Auto-Seeding:** Automated administrative account provisioning from environment variables on initial database boot.
- **Storage Flexibility:** Pluggable media storage supporting both Cloudinary and local filesystem uploads (`/uploads`).

---

## 🏗️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion |
| **Validation** | Zod (Dual-layer validation for client forms and server payloads) |
| **Backend API** | Node.js, Express.js, TypeScript, Mongoose ODM |
| **Database** | MongoDB Atlas / Local MongoDB |
| **Security** | Helmet, CORS, Express Rate Limit, BcryptJS, JSONWebToken, Cookie-Parser |
| **Media Storage** | Cloudinary SDK or Local Multi-part Uploads with Multer |
| **SEO & Meta** | LocalBusiness / School Schema.org JSON-LD, Dynamic XML Sitemap, Robots.txt, OpenGraph |

---

## 📁 Repository Structure

```text
madni-public-school-web/
├── client/                     # Next.js 14 Frontend Application
│   ├── public/                 # Static assets (emblems, SVG illustrations, icons)
│   │   └── images/
│   │       ├── logo/           # School emblem SVG
│   │       ├── hero/           # Campus building illustration
│   │       ├── gallery/        # High-res activity placeholders
│   │       └── admin/          # Administration leadership portraits
│   ├── src/
│   │   ├── app/                # App Router routes
│   │   │   ├── admin/          # Protected Admin Dashboard & Login routes
│   │   │   ├── gallery/        # Full Photo Archive page
│   │   │   ├── globals.css     # Tailwind directives & accessibility utilities
│   │   │   ├── layout.tsx      # Root HTML layout with JSON-LD schema & meta
│   │   │   ├── not-found.tsx   # Custom 404 page
│   │   │   ├── page.tsx        # Single-page smooth-scroll home experience
│   │   │   ├── robots.ts       # Robots.txt generator
│   │   │   └── sitemap.ts      # XML Sitemap generator
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ContactForm.tsx
│   │   │   ├── FloatingActions.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LightboxModal.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── TopBar.tsx
│   │   ├── lib/
│   │   │   ├── api.ts          # Centralized typed API client
│   │   │   └── constants.ts    # School facts, navigation links, and pillars
│   │   └── types/              # Frontend TypeScript definitions
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── server/                     # Express.js REST API
│   ├── src/
│   │   ├── config/             # DB connection, CORS, Environment validation
│   │   ├── controllers/        # Request handlers (Auth, Inquiries, Gallery, Events)
│   │   ├── middleware/         # Auth verification, Rate limiter, Error handler
│   │   ├── models/             # Mongoose schemas (AdminUser, Inquiry, Gallery, Event)
│   │   ├── routes/             # Versioned Express routes (/api/v1/...)
│   │   ├── services/           # Storage service (Cloudinary / Local storage)
│   │   ├── types/              # Backend TypeScript interfaces
│   │   ├── utils/              # Admin seeder, JWT helpers, Logger
│   │   └── index.ts            # Server entrypoint
│   ├── uploads/                # Local uploaded media storage
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml          # Docker Compose orchestration
├── .env.example                # Root environment template
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

---

## ⚙️ Local Development Setup

### Prerequisites
1. **Node.js** v18.18.0 or higher
2. **npm** v9 or higher
3. **MongoDB** instance (Local MongoDB or free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

---

### Step 1: Clone Repository
```bash
git clone https://github.com/Bushramaryam747/madni-public-school-web.git
cd madni-public-school-web
```

---

### Step 2: Configure Server Environment
Create `server/.env` (or copy from `server/.env.example`):

```bash
cp server/.env.example server/.env
```

Set your configuration values:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/madni_school_db
# Or MongoDB Atlas:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/madni_school?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=super_secret_jwt_key_madni_school_2024_change_in_production
JWT_EXPIRES_IN=7d

# Initial Admin User (Automatically seeded on boot)
ADMIN_EMAIL=admin@madnipublicschool.edu.pk
ADMIN_PASSWORD=MadniAdmin2024!
ADMIN_NAME="School Administrator"

# Media Storage Provider: "local" or "cloudinary"
STORAGE_PROVIDER=local

# Cloudinary (Optional if STORAGE_PROVIDER=cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

### Step 3: Configure Client Environment
Create `client/.env.local` (or copy from `client/.env.example`):

```bash
cp client/.env.example client/.env.local
```

Populate:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### Step 4: Install Dependencies & Run

#### In Terminal 1 (Start Server API):
```bash
cd server
npm install
npm run dev
```
*API will start on `http://localhost:5000`. The admin user is automatically created if it does not already exist.*

#### In Terminal 2 (Start Next.js Client):
```bash
cd client
npm install
npm run dev
```
*Next.js app will be accessible at `http://localhost:3000`.*

---

## 🔐 Administrative Access

Navigate to `http://localhost:3000/admin/login` and log in with your credentials:
- **Default Email:** `admin@madnipublicschool.edu.pk`
- **Default Password:** `MadniAdmin2024!` *(or the password set in your `.env`)*

### Admin Dashboard Capabilities:
1. **Admission Inquiries:** Review parent submissions, toggle status (`New` ↔ `Contacted`), and delete processed inquiries.
2. **Campus Gallery:** Upload photos with category assignments (`Classroom`, `Learning`, `Events`, `Prize Distribution`, `Sports`, `School Building`) and delete existing images.
3. **Events & Milestones:** Publish and manage school activities with badges, event dates, and descriptions.
4. **Analytics Overview:** Instant status breakdown of total inquiries, pending follow-ups, and published gallery media.

---

## 🧪 Testing & Production Builds

### Server Type-Check & Build
```bash
cd server
npx tsc --noEmit
npm run build
```

### Client Type-Check & Build
```bash
cd client
npx tsc --noEmit
npm run build
```

---

## 🚢 Production Deployment Guide

### Option 1: Vercel (Frontend) + Render / Railway (Backend)

#### 1. Backend on Render / Railway
1. Create a **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
2. Set Root Directory to `server`.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Configure Environment Variables matching `server/.env.example`:
   - `NODE_ENV=production`
   - `MONGO_URI=<your_mongodb_atlas_connection_string>`
   - `JWT_SECRET=<strong_random_secret_string>`
   - `CLIENT_URL=https://<your-vercel-domain>.vercel.app`
   - `STORAGE_PROVIDER=cloudinary` *(Recommended for serverless/ephemeral hosts)*
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`

#### 2. Database on MongoDB Atlas
1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a Database User with read/write privileges.
3. In Network Access, whitelist IP `0.0.0.0/0` (or host IP).
4. Copy the connection string and paste into `MONGO_URI`.

#### 3. Frontend on Vercel
1. Import the repository into [Vercel](https://vercel.com).
2. Set Framework Preset: **Next.js**.
3. Set Root Directory: `client`.
4. Configure Environment Variables:
   - `NEXT_PUBLIC_API_URL=https://<your-render-api-url>/api/v1`
   - `NEXT_PUBLIC_SITE_URL=https://<your-vercel-domain>.vercel.app`
5. Click **Deploy**.

---

### Option 2: Docker & Docker Compose (VPS / Self-Hosted)

Run both client and server behind MongoDB with one command:
```bash
docker-compose up --build -d
```

---

## 🔍 SEO & Accessibility Compliance

- **Semantic Hierarchy:** Single `<h1>` on the homepage, structured section landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **WCAG AA Color Contrast:** Deep green (`#166534`) and dark slate text (`#0F172A`) over white backgrounds achieve contrast ratios exceeding 7:1.
- **Accessible Modals:** ARIA role dialogs, keyboard `Esc` listener, arrow navigation for lightbox, focus trapping, and `prefers-reduced-motion` compliance.
- **Local SEO:** Comprehensive `School` JSON-LD schema with geo-coordinates, street address in Madni Town D.I. Khan, official phone number, and service area.
- **OpenGraph & Twitter Cards:** Complete social preview metadata with rich preview images.

---

## 📞 School Verification Contact

- **Madni Public School**
- **Address:** Madni Town, near Shah Alam Abad, D.I. Khan, Khyber Pakhtunkhwa, Pakistan
- **Phone:** `+92 318 9969994` / `0318-9969994`
- **Classes:** 1 to 8

---

## 📄 License
This codebase is developed exclusively for **Madni Public School**. All rights reserved.
