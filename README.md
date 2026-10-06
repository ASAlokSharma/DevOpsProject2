# DevOpsProject1
React + Vite + Tailwind + Supabase Auth (Email, Google, GitHub), deployed to GitHub Pages with GitHub Actions.

## Run locally
1. `cp .env.example .env` and fill in your Supabase URL and anon key
2. `npm install && npm run dev` then open http://localhost:5173/DevOpsProject1/

## Deploy
Repo Settings > Secrets and variables > Actions: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
Repo Settings > Pages > Source: **GitHub Actions**. Push to `main`.
