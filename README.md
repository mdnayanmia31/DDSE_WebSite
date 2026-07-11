# DDSE — Dimension Digital Survey & Engineering

> **ডাইমেনশন ডিজিটাল সার্ভে অ্যান্ড ইঞ্জিনিয়ারিং**
> A Trusted Institution for Topographical Survey & Soil Test

Official website for Dimension Digital Survey & Engineering — a government-approved (Survey of Bangladesh, Licence No. 6397) digital land survey and civil engineering company based in Barisal, Bangladesh.

## Tech Stack

- **HTML5 + CSS3 + Vanilla JavaScript (ES6+)** — No frameworks
- **GSAP 3** — Hero animations, counters, scroll reveals (via CDN)
- **ScrollReveal.js** — Section entrance animations (via CDN)
- **Parcel 2** — Bundler, minifier, optimizer
- **Google Sheets API** — Report metadata (read-only)
- **Google Drive API** — PDF storage & admin uploads (OAuth)
- **Netlify** — Hosting (free tier)

## Quick Start

```bash
# Install dependencies
npm install

# Copy config and add your API keys
cp config.example.js config.js

# Start dev server (hot reload)
npm run dev

# Production build
npm run build
```

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage — hero, stats, services, gallery preview |
| `about.html` | Company profile, trade license, staff directory |
| `services.html` | All 9 services in detail |
| `team.html` | Full team by department |
| `ceo.html` | MD profile, experience, education, CV download |
| `reports.html` | Client report download (Google Sheets lookup) |
| `gallery.html` | Filterable project photo gallery |
| `contact.html` | Contact info, Google Maps, Netlify form |
| `admin.html` | Staff-only upload panel (password-gated) |

## Configuration

Copy `config.example.js` to `config.js` and fill in:

- `GOOGLE_API_KEY` — For Sheets read access
- `SHEETS_ID` — Google Sheet with report data
- `DRIVE_FOLDER_ID` — Drive folder for report PDFs
- `GALLERY_FOLDER_ID` — Drive folder for gallery images
- `OAUTH_CLIENT_ID` — For admin panel write access
- `ADMIN_PASSWORD_HASH` — SHA-256 hash of admin password

## Deploy to Netlify

1. Connect GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

---

**Dimension Digital Survey & Engineering**
Helen Plaza, Major MA Jalil Road, Barisal, Bangladesh
📞 01754-012596 | ✉️ ddsebd52454@gmail.com
