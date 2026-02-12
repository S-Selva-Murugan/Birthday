# Namitha's Birthday — Next.js App

A small, lovely Next.js landing page to celebrate Namitha's birthday.

Getting started

1. Install dependencies

```bash
npm install
# Namitha's Birthday — Next.js App

A small, lovely Next.js landing page to celebrate Namitha's birthday.

Getting started

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Files of interest:
- `pages/index.js` — main landing page
- `components/` — reusable UI pieces
- `styles/globals.css` — styles and animations

Customize the message, colors, and images to make it extra special.

---

## Deploying to Vercel (recommended)

You can deploy this Next.js app to Vercel in a couple of easy ways. Vercel auto-detects Next.js and will run `npm run build`.

### Option A — Import the repo via the Vercel Dashboard

1. Push this project to a Git provider (GitHub/GitLab/Bitbucket):

```bash
git init
git add .
git commit -m "initial"
# create a repo on GitHub and push (or use the GitHub CLI)
```

2. Go to https://vercel.com → New Project → Import Project and choose your repository. Configure (defaults are fine) and click Deploy.

### Option B — Deploy from your machine with the Vercel CLI

```bash
npm i -g vercel
vercel login
vercel # follow interactive prompts
# to create a production deployment
vercel --prod
```

After deploying you'll get a URL you can open on your phone.

### Local testing on your phone
Start the dev server locally and open `http://YOUR_COMPUTER_IP:3000` on your phone (both devices must be on the same Wi‑Fi):

```bash
npm install
npm run dev
```

Use `ipconfig getifaddr en0` (macOS) to find your local IP.

### Notes & troubleshooting
- Images in `public/photos` are static and will be deployed as-is.
- Suggestions are stored in localStorage — they will persist per device/browser.
- If a deployment fails, check the Vercel build logs (Dashboard → Deployments → [failure] → Logs).

## Optional: automatic deploy on push
If you push this repo to GitHub and import it into Vercel, deployments will happen automatically on each push to the connected branch.

---

If you'd like, I can also add a small `vercel.json` or a GitHub Actions workflow to automate builds and previews. Tell me which one you prefer and I can add it.
