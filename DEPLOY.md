# Deploying Design Actions

## What you need
- A free Vercel account (vercel.com)
- A free GitHub account (github.com)
- Your Anthropic API key (console.anthropic.com)
- Node.js installed locally (nodejs.org)

---

## Step 1 — Set up the project

Create a new folder called `design-actions` and add these files:

```
design-actions/
├── api/
│   └── generate.js        ← the serverless function
├── public/
│   └── index.html         ← shell HTML (see below)
├── src/
│   └── App.jsx            ← your design-actions.jsx (renamed)
├── .env.example
├── .gitignore
├── package.json
└── vite.config.js
```

### package.json
```json
{
  "name": "design-actions",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}
```

### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### public/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Design Actions</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### src/main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## Step 2 — Update the API call in App.jsx

In `HereNowTab`, find the `generateBrief` function and replace the direct
Anthropic call with a call to your own backend:

```js
// REPLACE THIS:
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ model: "...", ... })
});
const data = await response.json();
const result = data.content?.find(b => b.type === "text")?.text || "";

// WITH THIS:
const response = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    pairs: journey.map(s => ({ cue: s.cue.word, contour: s.contour.word })),
    location: place,
  }),
});
const data = await response.json();
const result = data.text || "";
```

---

## Step 3 — Add your API key

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Open `.env.local` and add your key:
```
ANTHROPIC_API_KEY=sk-ant-...your key here...
```

---

## Step 4 — Test locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.
The app should work fully including the here·now brief generation.

---

## Step 5 — Deploy to Vercel

### Option A — Via GitHub (recommended)

1. Create a new GitHub repo called `design-actions`
2. Add a `.gitignore` file containing:
   ```
   node_modules
   dist
   .env.local
   ```
3. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial"
   git remote add origin https://github.com/YOUR_USERNAME/design-actions.git
   git push -u origin main
   ```
4. Go to vercel.com → New Project → Import from GitHub
5. Select your repo — Vercel detects Vite automatically
6. Before deploying, add your environment variable:
   - Settings → Environment Variables
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key
7. Click Deploy

### Option B — Via Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Then add your environment variable:
```bash
vercel env add ANTHROPIC_API_KEY
```

---

## Step 6 — Location permissions

The app requests geolocation via the browser. On iOS Safari, the user
will see a permission dialog the first time. On a deployed HTTPS site
(which Vercel provides automatically) this works natively.

For the best iOS experience, add this to your `index.html` `<head>`:
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

This allows the app to be saved to the home screen and run in
full-screen mode, behaving like a native app.

---

## Summary

| Step | Time |
|------|------|
| Set up project files | 15 min |
| Update API call | 5 min |
| Test locally | 10 min |
| Deploy to Vercel | 10 min |
| **Total** | **~40 min** |

The serverless function in `api/generate.js` keeps your API key
completely server-side — it is never exposed to the browser.
