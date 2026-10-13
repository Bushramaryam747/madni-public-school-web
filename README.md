# Madni Public School — Official Website & Management System

> **A modern, production-ready web platform for Madni Public School (Classes 1 to 8), located in Madni Town, near Shah Alam Abad, D.I. Khan, Khyber Pakhtunkhwa, Pakistan.**  
> Established in 2001 • Celebrating **23 Years of Educational Excellence**.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📌 Table of Contents
1. [Institutional Profile](#-institutional-profile)
2. [Key Features](#-key-features)
3. [Design System & Branding](#-design-system--branding)
4. [Architecture & Tech Stack](#-architecture--tech-stack)
5. [Project Structure](#-project-structure)
6. [Prerequisites](#-prerequisites)
7. [Step-by-Step Local Setup](#-step-by-step-local-setup)
8. [Admin Portal & Default Credentials](#-admin-portal--default-credentials)
9. [API Endpoints Reference](#-api-endpoints-reference)
10. [SEO & Structured Data](#-seo--structured-data)
11. [Accessibility & WCAG Compliance](#-accessibility--wcag-compliance)
12. [Production Deployment Guide](#-production-deployment-guide)
13. [Docker Setup](#-docker-setup)

---

## 🏫 Institutional Profile

- **School Name**: Madni Public School
- **Location**: Madni Town, near Shah Alam Abad, Dera Ismail Khan (D.I. Khan), Khyber Pakhtunkhwa, Pakistan
- **Level**: Classes 1 to 8 (Primary & Middle Wings)
- **Academic Foundation**: Established in 2001 (**23 Years of Excellence**)
- **Direct Helpline**: `+92 318 9969994` / `0318-9969994` (One-tap direct dialing & WhatsApp)
- **Core Motto**: *Building Knowledge, Character & A Brighter Future*

---

## ✨ Key Features

### 🌟 Parent & Public Experience
- **Mobile-First Responsive Layout**: Built with high priority for mobile users in D.I. Khan accessing the site over cellular 3G/4G/5G connections.
- **Sticky Header Navigation**: Seamless scroll navigation to `#home`, `#about`, `#academics`, `#activities`, `/gallery`, `#admissions`, and `#contact` with collapsible ARIA-accessible mobile menu.
- **Hero Showcase**: Prominent "23 Years of Excellence" badge, campus illustration, primary CTAs (*Explore Our School* and *Contact Us*), and direct tap-to-call.
- **Academics Wing (Classes 1–8)**: Detailed curriculum breakdown for Primary Wing (Classes 1–5) and Middle Wing (Classes 6–8), plus pedagogical pillars.
- **Why Choose Us**: 6 institutional strength cards with custom line icons and hover lifts.
- **Interactive Activities & Gallery**: Filterable photo gallery by category (*Classroom, Learning, Events, Prize Distribution, Sports, School Building*) with an accessible touch/keyboard lightbox modal (Esc, Left/Right arrows, touch swipe).
- **Achievements & Annual Events**: Highlights covering annual prize distributions, academic exhibitions, and character-building assemblies.
- **Administration Address**: Statement from school administration emphasizing discipline, Islamic moral values, and academic mastery.
- **Admissions Open Banner**: High-conversion visual banner leading directly to the inquiry desk.
- **Contact Desk & Form**:
  - Direct tap-to-call link for `0318-9969994`
  - Floating WhatsApp click-to-chat action
  - Google Maps interactive embed
  - Working inquiry form with client & server Zod validation, honeypot spam guard, rate limiting, and friendly confirmation states.
- **Custom 404 Page**: Professional branded error page with fast recovery links.

### 🛡️ Administrative Portal (`/admin`)
- **Secure Authentication**: Single-admin role with bcrypt password hashing and JWT delivered via secure httpOnly cookies.
- **Admission Inquiries Manager**: Filter inquiries (`All`, `New`, `Contacted`), mark status with one click, or safely archive.
- **Gallery Management**: Upload images with title, category, and alt text, or delete outdated images.
- **Events & Milestones Manager**: Post new school events and achievements or remove past listings.
- **Institutional Analytics**: Real-time summary counts for inquiries, gallery items, and system health.

---

## 🎨 Design System & Branding

Consistent institutional color palette matching the green emblem and educational heritage:

| Role | Color Name | Hex Code | Purpose |
|------|------------|----------|---------|
| **Primary** | Deep Forest Green | `#166534` | Brand headers, primary action buttons, key badges |
| **Primary Dark** | Deep Evergreen | `#14532D` | Button hover states, dark contrast elements |
| **Secondary** | Professional Navy | `#1D4ED8` | Subheadings, links, informational badges |
| **Accent** | Soft Emerald Green | `#22C55E` | Highlights, active status indicators, checkmarks |
| **Neutral Dark**| Slate Text | `#0F172A` | High-contrast readable body typography (WCAG AAA) |
| **Neutral Light**| Pure White | `#FFFFFF` | Primary container surfaces |
| **Background** | Clean Off-White | `#F8FAFC` | Section alternate backgrounds |
| **Border** | Subtle Slate | `#E2E8F0` | Elegant container borders |

- **Typography**: Inter (Google Fonts) with strong legibility and clean sans-serif geometry.
- **Cards**: `rounded-2xl` & `rounded-3xl` cards with soft elevation (`shadow-xs` to `shadow-md`).
- **Motion**: Subtle fade-ins with strict adherence to `prefers-reduced-motion`.

---

## 🏗️ Architecture & Tech Stack

```
madni-public-school-web/
├── client/                     # Next.js 14 Frontend (App Router + Tailwind)
│   ├── src/
│   │   ├── app/                # App Router (pages: /, /gallery, /admin, /not-found)
│   │   ├── components/         # Reusable UI components (Navbar, TopBar, Lightbox, etc.)
│   │   ├── lib/                # Constants, API client, utilities
│   │   └── types/              # Frontend TypeScript definitions
│   └── public/                 # Static assets, SVG illustrations, logos
├── server/                     # Node.js + Express + TypeScript API
│   └── src/
│       ├── config/             # DB & environment configuration
│       ├── controllers/        # Handlers for auth, inquiries, gallery, events
│       ├── middleware/         # Auth, validation, rate limiting, error handler
│       ├── models/             # Mongoose schemas (AdminUser, Inquiry, Gallery, Event)
│       ├── routes/             # Versioned API routes (/api/v1/...)
│       └── utils/              # Token generation, logger, email integration point
├── docker-compose.yml          # Local container orchestration
└── README.md                   # Complete documentation
```

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide React, Zod.
- **Backend**: Node.js, Express 4, TypeScript, Mongoose 8, JWT (`jsonwebtoken`), Bcryptjs, Helmet, Express-Rate-Limit, CORS, Multer.
- **Database**: MongoDB (Local or MongoDB Atlas cloud).

---

## 🚀 Step-by-Step Local Setup

### 1. Clone Repository
```bash
git clone https://github.com/Bushramaryam747/madni-public-school-web.git
cd madni-public-school-web
```

### 2. Configure Environment Variables

**Root / Server (`server/.env` or root `.env`)**:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/madni_public_school
JWT_SECRET=MadniPublicSchoolSecureSecretKey2024!
JWT_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Initial Admin Seeding (Auto-created on first server boot)
ADMIN_EMAIL=admin@madnipublicschool.edu.pk
ADMIN_PASSWORD=MadniAdmin2024!
ADMIN_NAME=Madni School Administration

# Storage Provider (local or cloudinary)
STORAGE_PROVIDER=local
UPLOAD_DIR=uploads
```

**Client (`client/.env.local`)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Install Dependencies & Build

**Backend**:
```bash
cd server
npm install
npm run build   # Or run directly in dev mode with: npm run dev
```

**Frontend**:
```bash
cd ../client
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🔑 Admin Portal & Default Credentials

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter the default administrator credentials:
   - **Email**: `admin@madnipublicschool.edu.pk`
   - **Password**: `MadniAdmin2024!`
3. Once authenticated, the secure HTTP-only cookie will grant full access to the `/admin` dashboard to manage admissions, gallery, events, and view stats.

---

## 📡 API Endpoints Reference

All endpoints are versioned under `/api/v1`:

### Public Endpoints
- `POST /api/v1/contact` — Submit an admission inquiry (Rate limited, honeypot protected, Zod validated)
- `GET /api/v1/gallery` — Retrieve campus gallery items (Supports `?category=Classroom`)
- `GET /api/v1/events` — Retrieve published school events and achievements

### Authentication
- `POST /api/v1/auth/login` — Admin login (Sets httpOnly JWT cookie)
- `POST /api/v1/auth/logout` — Admin logout (Clears authentication cookie)
- `GET /api/v1/auth/me` — Verify active administrator session

### Protected Admin Endpoints (Requires valid JWT)
- `GET /api/v1/admin/stats` — Overall counts (Inquiries, Gallery items, Events)
- `GET /api/v1/admin/inquiries` — List inquiries with status filter
- `PATCH /api/v1/admin/inquiries/:id` — Update inquiry status (`new`, `contacted`, `archived`)
- `DELETE /api/v1/admin/inquiries/:id` — Delete inquiry record
- `POST /api/v1/gallery` — Upload gallery item (Supports file upload or image URL)
- `DELETE /api/v1/gallery/:id` — Remove gallery item
- `POST /api/v1/events` — Create school milestone/event
- `PUT /api/v1/events/:id` — Edit school milestone/event
- `DELETE /api/v1/events/:id` — Remove school milestone/event

---

## 🔍 SEO & Structured Data

- **Canonical URL**: `https://madnipublicschool.edu.pk`
- **Dynamic Meta Tags**: Title templates, localized meta descriptions, Open Graph images (`1200x700`), Twitter Cards.
- **Local SEO Keywords**: *Madni Public School D.I. Khan, schools in Madni Town near Shah Alam Abad, Classes 1 to 8 admissions Dera Ismail Khan KPK*.
- **Structured Data (Schema.org)**:
  - Formatted JSON-LD with `@type: ["School", "EducationalOrganization"]`
  - Complete geo-coordinates (`31.8315, 70.8872`)
  - Full postal address and telephone (`+92-318-9969994`)
  - Course Offer Catalog for Primary Wing (Classes 1–5) and Middle Wing (Classes 6–8)
- **Robots & Sitemap**:
  - Automatically generated `/sitemap.xml` via `app/sitemap.ts`
  - Safe `/robots.txt` disallowing private `/admin/*` and `/api/*` routes

---

## ♿ Accessibility & WCAG Compliance

- **Semantic Landmark Structure**: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>`.
- **Contrast**: Text contrast strictly exceeds WCAG AA (and AAA for dark text on white).
- **Keyboard Navigation**:
  - Focusable interactive elements have visible rings (`focus-visible:ring-2 focus-visible:ring-school-primary`).
  - Lightbox modal supports `Escape` to close and `Left`/`Right` arrow keys to cycle images.
  - Mobile drawer closes gracefully on `Escape` and background backdrop click.
- **Screen Reader Support**: Descriptive ARIA labels on icon buttons, SVG icons marked `aria-hidden="true"`, and form error banners with `role="alert"`.
- **Prefers-Reduced-Motion**: Animation durations and transitions automatically ease when users have system-level reduced motion preferences enabled.

---

## 🚢 Production Deployment Guide

### Option A: Frontend on Vercel & Backend on Render / Railway
1. **Frontend (Vercel)**:
   - Import the repository into [Vercel](https://vercel.com).
   - Set **Root Directory** to `client`.
   - Add Environment Variable:
     `NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1`
   - Deploy.

2. **Backend (Render / Railway / VPS)**:
   - Create a Web Service pointing to `server`.
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Configure Environment Variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL=https://your-vercel-domain.com`, `NODE_ENV=production`).

3. **Database (MongoDB Atlas)**:
   - Create a free or dedicated cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Whitelist your backend IP addresses (`0.0.0.0/0` for serverless/PaaS).
   - Copy the connection string to `MONGO_URI`.

---

## 🐳 Docker Setup

Run both client, server, and local MongoDB with a single command:

```bash
docker-compose up --build -d
```

- **Frontend**: Accessible at `http://localhost:3000`
- **Backend API**: Accessible at `http://localhost:5000`
- **MongoDB**: Running at `localhost:27017`

---

## 📄 License & Attribution

Designed and engineered for **Madni Public School**, Madni Town, D.I. Khan, KPK, Pakistan.  
All institutional marks, logos, and content are property of Madni Public School.
