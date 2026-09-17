# TourGuide Academy — Professional Tour Guide Certification Platform

A modern React + Tailwind CSS web application built for aspiring tour guides to master the craft of storytelling, heritage interpretation, and tour group management from top-rated international instructors.

Designed for frictionless deployment to **GitHub** and **Vercel**, and connected directly to the shared Supabase **`tour_guide`** database backend.

---

## 🚀 Features

- **Exact Visual Fidelity & Aesthetics**: Preserves the original layout, animations, typography (**Poppins** & **Volkhov**), and color scheme (`#F1A501` primary amber, `#DF6951` coral, `#181E4B` deep navy, `#5E6282` secondary slate).
- **Curated Tour Guide Intro Video**: Embedded responsive modal featuring the official introductory masterclass (*How to Become a Tour Guide*).
- **Shared Supabase Central Backend**:
  - Dynamically fetches accredited tour guides from the `tour_guides` table with live ratings, specialties, and hourly rates.
  - Submits prospective student registrations directly into the `students` table (`name`, `email`, `phone`, `address`, `guide_id`, `guide_name`, `guide_rate`, `status`).
  - Shared with the primary Tour Guide platform so administrators can monitor and manage enrolled students simultaneously.
- **Vercel & GitHub Ready**: Pre-configured `vercel.json` SPA rewrite rules and optimized Vite production bundling.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite 6
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **Backend & Database**: Supabase (`@supabase/supabase-js`)
- **Icons & Assets**: SVG iconography, Poppins & Volkhov Google Fonts

---

## 📦 Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd learn_tour_guide
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` (already configured with project defaults):
   ```env
   VITE_SUPABASE_URL=https://geijvxhwkbbnmjffqyyk.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```

4. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run Integration Tests (Sandbox / CI)**:
   ```bash
   npm run test:db
   ```

6. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to Vercel

1. Push this project to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**. Vercel will automatically build the site using `dist/` and handle all route rewrites via `vercel.json`.