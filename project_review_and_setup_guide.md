# DDSE Website — Complete Project Review & Setup Guide

> **Dimension Digital Survey & Engineering — Full Audit + How to Run**

---

## 📊 Project Completeness Summary

| Category | Status | Notes |
|----------|--------|-------|
| **HTML Pages (9/9)** | ✅ Complete | All pages built and structured |
| **CSS Design System** | ✅ Complete | Variables, components, responsive |
| **JavaScript Logic** | ✅ Complete | main.js, reports.js, gallery.js, admin.js |
| **GSAP Animations** | ✅ Complete | Hero, counters, scroll, cards |
| **ScrollReveal** | ✅ Complete | Section entrances working |
| **Google Sheets Integration** | ✅ Code Complete | Needs API keys to function |
| **Google Drive Upload** | ✅ Code Complete | Needs OAuth to function |
| **Admin Panel** | ✅ Complete | Password gate + upload forms |
| **Contact Form (Netlify)** | ✅ Complete | Uses `data-netlify="true"` |
| **Bilingual (EN/BN)** | ✅ Complete | Bengali text throughout |
| **Responsive Design** | ✅ Complete | Mobile, tablet, desktop, print |
| **Accessibility** | ⚠️ Partial | See issues below |
| **Image Assets** | ❌ Missing | No actual images exist |
| **CEO CV PDF** | ❌ Missing | `assets/docs/ceo-cv.pdf` empty dir |
| **Logo** | ❌ Missing | `assets/images/logo.png` not found |
| **Google API Keys** | ❌ Not configured | `config.js` has placeholder values |

---

## 🐛 Issues & Bugs Found

### Critical Issues

| # | File | Issue | Impact |
|---|------|-------|--------|
| 1 | **All assets** | `assets/images/logo.png` does not exist — every page references it as favicon | Broken favicon on all pages |
| 2 | **`assets/docs/`** | Directory is empty — `ceo.html` links to `assets/docs/ceo-cv.pdf` | Dead download link on CEO page |
| 3 | **`assets/images/`** | No images exist at all (no `hero-bg.jpg`, `trade-license.jpg`, `ceo-photo.jpg`) | Gallery shows only emoji placeholders, no real photos |
| 4 | **`config.js`** | Contains placeholder strings (`YOUR_GOOGLE_API_KEY`, etc.) | Reports page and Admin panel will not function until real keys are added |
| 5 | **`admin.js:182`** | Sheets API append URL has a malformed path: `Reports!A:I:append` (colon before append) | Admin report upload will fail with a 400 error |

### Moderate Issues

| # | File | Issue |
|---|------|-------|
| 6 | **`index.html:303`** | CEO bio says "Founded DDSE in **2018**" but company was "Founded **2015**" per the spec. The spec clarifies 2015 = founding, 2018 = Survey of Bangladesh approval. The text is confusing. |
| 7 | **`about.html:164`** | Google Maps embed uses placeholder coordinates (`22.701, 90.365`) — not the actual DDSE office location. Map will show wrong spot. |
| 8 | **`contact.html:111`** | Same placeholder Google Maps embed. |
| 9 | **All HTML** | `about.html` and some inner pages have the hardcoded `class="active"` on nav links, but `main.js` also dynamically sets `.active`. The JS logic handles it, but the pre-set classes could cause a brief double-active on about.html if both `about.html` link and another match. Minor, but wasteful. |
| 10 | **Gallery** | The lightbox only works with `<img>` tags, but gallery items currently use `<div>` with emoji backgrounds — no `<img>` elements. Clicking a gallery item opens a lightbox with an empty `src`. |
| 11 | **`index.html:242`** | The mini report form on homepage is just a static link to `reports.html` — it collects input fields but doesn't actually pass them. User types ID/phone then gets redirected to a blank form. |

### Minor / Code Quality

| # | File | Issue |
|---|------|-------|
| 12 | **`.parcelrc`** | Missing the image transformer rule mentioned in the spec (`@parcel/transformer-image`). Current config is just `extends: @parcel/config-default`. |
| 13 | **`config.js`** | Currently loaded as a plain `<script src="../config.js">` — Parcel may not bundle it correctly since it's outside `src/`. Works in dev but could break in production build depending on path resolution. |
| 14 | **CSS** | `badge-approved` uses raw `rgba()` values instead of CSS variables for the background/border — violates the "zero hardcoded hex" rule from the spec. Same for a few other component styles. |
| 15 | **`about.html`** | Missing 2 staff members from the spec: `Shafikul Islam` and `Sadia` are listed in the rules but not shown on `about.html`'s staff directory (they are on `team.html` though). |

---

## ✅ What's Well Done

- **Design system** is thorough — CSS variables, typography, spacing, gradients all properly tokenized
- **GSAP animation code** respects `prefers-reduced-motion`, uses `will-change`, debounces scroll
- **Bilingual text** consistently present across all pages (English + Bengali)
- **Semantic HTML** — proper `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` usage
- **Mobile navigation** — hamburger menu with body scroll lock
- **Admin panel security** — SHA-256 hash check, `noindex` meta, sessionStorage
- **Error handling** — try/catch on all async, styled error alerts, loading states
- **Netlify form** — proper `data-netlify` attribute with honeypot spam protection
- **Print stylesheet** — hides nav, footer, loader for clean printing

---

## 🚀 Complete Setup Guide — How to Run This Project

### Prerequisites

You need:
- **Node.js** (v16 or later) — [Download here](https://nodejs.org/)
- **A Google account** (for API access)
- **A terminal** (your Linux terminal is fine)

---

### Step 1: Install Dependencies

```bash
cd /home/nayan-linux/Developer/DDSE_Site
npm install
```

This installs **Parcel** (the bundler). That's the only dependency.

---

### Step 2: Set Up Google Cloud (for Reports + Admin)

> [!IMPORTANT]
> You need **3 things** from Google:
> 1. A **Google API Key** (for reading the spreadsheet)
> 2. A **Google Sheet** (to store report metadata)
> 3. An **OAuth Client ID** (for admin panel to upload to Drive/Sheets)
>
> If you only want to see the website design without the report/admin features, you can skip this step and just run `npm run dev` — the site will load fine, just the Reports and Admin pages won't connect.

#### 2a. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top → **"New Project"**
3. Name it `DDSE Website` → Click **Create**
4. Make sure the new project is selected in the dropdown

#### 2b. Enable Required APIs

In the Google Cloud Console with your project selected:

1. Go to **APIs & Services → Library**
2. Search for and **Enable** each of these:
   - ✅ **Google Sheets API**
   - ✅ **Google Drive API**

#### 2c. Create an API Key (for reading reports)

1. Go to **APIs & Services → Credentials**
2. Click **+ CREATE CREDENTIALS → API Key**
3. A key will be generated (looks like `AIzaSy...`)
4. Click **Restrict Key** (recommended):
   - Under **API restrictions** → select **Restrict key**
   - Choose: **Google Sheets API** only
   - Under **Application restrictions** → **HTTP referrers**
   - Add your domains: `localhost:*`, `yourdomain.com/*`
5. Copy the API key — this is your `GOOGLE_API_KEY`

#### 2d. Create a Google Sheet (report database)

1. Go to [Google Sheets](https://sheets.google.com/) → Create a new spreadsheet
2. Name it `DDSE Reports`
3. In the first row (header), type these exact column headers:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| report_id | client_phone | client_name | survey_type | location | date | drive_file_id | description | status |

4. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit
   ```
   The `THIS_IS_YOUR_SHEET_ID` part is your `SHEETS_ID`

5. **Make the sheet readable**: Click **Share** → **Anyone with the link** → **Viewer**

#### 2e. Create Google Drive Folders

1. Go to [Google Drive](https://drive.google.com/)
2. Create a folder called `DDSE Reports` (for PDF report storage)
3. Create a folder called `DDSE Gallery` (for gallery photos)
4. For each folder:
   - Right-click → **Share** → **Anyone with the link** → **Viewer**
   - Copy the folder ID from the URL:
     ```
     https://drive.google.com/drive/folders/THIS_IS_YOUR_FOLDER_ID
     ```

#### 2f. Create OAuth Client ID (for Admin panel uploads)

1. In Google Cloud Console → **APIs & Services → Credentials**
2. Click **+ CREATE CREDENTIALS → OAuth Client ID**
3. If prompted, **configure the OAuth consent screen** first:
   - User Type: **External**
   - App name: `DDSE Admin`
   - Support email: your email
   - Authorized domains: add your domain
   - Scopes: Add `../auth/drive.file` and `../auth/spreadsheets`
   - Test users: Add the company Gmail account
   - Click **Save**
4. Now create the OAuth Client ID:
   - Application type: **Web application**
   - Authorized JavaScript origins: Add `http://localhost:1234` and your production URL
   - Authorized redirect URIs: Same as above
5. Copy the **Client ID** (looks like `xxxxx.apps.googleusercontent.com`)
   This is your `OAUTH_CLIENT_ID`

---

### Step 3: Generate Admin Password Hash

The admin panel uses a SHA-256 hash. To generate one:

```bash
echo -n "your_chosen_password" | sha256sum | awk '{print $1}'
```

For example, if your password is `ddse2024`:
```bash
echo -n "ddse2024" | sha256sum | awk '{print $1}'
```

Copy the output — that's your `ADMIN_PASSWORD_HASH`.

---

### Step 4: Fill in `config.js`

Edit `/home/nayan-linux/Developer/DDSE_Site/config.js`:

```javascript
const CONFIG = {
  GOOGLE_API_KEY:       "AIzaSy...",           // From Step 2c
  SHEETS_ID:            "1BxiMVs...",          // From Step 2d
  SHEET_RANGE:          "Reports!A:I",         // Keep this as-is
  DRIVE_FOLDER_ID:      "1a2b3c...",           // From Step 2e (Reports folder)
  GALLERY_FOLDER_ID:    "7g8h9i...",           // From Step 2e (Gallery folder)
  OAUTH_CLIENT_ID:      "xxxx.apps...",        // From Step 2f
  ADMIN_PASSWORD_HASH:  "a665a4..."            // From Step 3
};
```

---

### Step 5: Add Real Assets

The following files are expected but currently missing:

| File Path | What It Is | What To Do |
|-----------|------------|------------|
| `src/assets/images/logo.png` | Company logo | Place the DDSE logo here |
| `src/assets/docs/ceo-cv.pdf` | MD's CV download | Place the CEO CV PDF here |
| `src/assets/images/trade-license.jpg` | E-Trade License scan | Place the license image here |
| `src/assets/images/trade-license-qr.png` | QR verification code | Place QR image here |
| `src/assets/images/ceo-photo.jpg` | CEO portrait | Place photo here |
| `src/assets/images/hero-bg.jpg` | Hero background (optional) | Place background image here |
| `src/assets/images/gallery/*.jpg` | Project photos | Place real project photos here |

> [!NOTE]
> The site will work without these — it uses emoji placeholders — but for a production-ready site, real images are essential. You can replace the emoji `<div>` blocks in gallery with actual `<img>` tags once you have the photos.

---

### Step 6: Run the Dev Server

```bash
cd /home/nayan-linux/Developer/DDSE_Site
npm run dev
```

This will:
- Start Parcel's dev server (usually at `http://localhost:1234`)
- Open the site in your browser automatically
- Hot-reload when you edit files

---

### Step 7: Build for Production

```bash
npm run build
```

This creates an optimized `dist/` folder with minified HTML, CSS, and JS.

---

### Step 8: Deploy to Netlify

**Option A: Git Deploy (Recommended)**
1. Push your project to GitHub (make sure `config.js` is in `.gitignore` ✅)
2. Go to [Netlify](https://netlify.com/) → **Add new site → Import from Git**
3. Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Deploy**

> [!WARNING]
> Since `config.js` is gitignored, the deployed site won't have API keys. You need to either:
> - **Option 1**: Use Netlify Environment Variables and modify the code to read from them
> - **Option 2**: Temporarily include `config.js` in the build (less secure but simpler for a static site)
> - **Option 3**: Create a Netlify build plugin that injects the config during build

**Option B: Manual Deploy**
1. Run `npm run build`
2. Drag the `dist/` folder onto [Netlify Drop](https://app.netlify.com/drop)
3. Your site is live instantly

---

## 🔧 Bug Fixes Still Needed

> [!CAUTION]
> These should be fixed before going to production:

### 1. Fix Admin Sheets API URL (Critical)
In `admin.js` line 182, the Sheets append URL is malformed:
```diff
- const url = `.../${CONFIG.SHEETS_ID}/values/Reports!A:I:append?valueInputOption=RAW`;
+ const url = `.../${CONFIG.SHEETS_ID}/values/Reports!A:I:append?valueInputOption=RAW`;
```
The `:append` needs to come after the range in the URL path, not with a colon separator. The correct Google Sheets API URL format is:
```
/v4/spreadsheets/{ID}/values/{RANGE}:append?valueInputOption=RAW
```
Currently the code has `Reports!A:I:append` which makes the range `Reports!A:I:append` instead of appending to `Reports!A:I`.

### 2. Add Missing Logo File
Place the company logo at `src/assets/images/logo.png` — currently every page has a broken favicon.

### 3. Fix Google Maps Embed
Replace the placeholder coordinates in `about.html` and `contact.html` with the actual DDSE Barisal office address.

### 4. Fix Gallery Lightbox
The lightbox looks for `<img>` tags inside gallery items, but currently gallery items have `<div>` emoji placeholders. Once real images are added, replace the emoji divs with proper `<img>` elements.

### 5. Fix Homepage Mini Report Form
The mini report form on `index.html` doesn't pass user input to `reports.html`. Either:
- Make it a direct link (remove the fake form inputs), or
- Pass the values via URL params and pre-fill on `reports.html`

---

## 📋 Production Checklist

- [ ] Add `logo.png` to `src/assets/images/`
- [ ] Add `ceo-cv.pdf` to `src/assets/docs/`
- [ ] Add trade license image + QR code
- [ ] Add real gallery photos and replace emoji placeholders with `<img>` tags
- [ ] Add CEO photo
- [ ] Set up Google Cloud Project (API Key, Sheet, Drive folders, OAuth)
- [ ] Fill in `config.js` with real values
- [ ] Generate and set admin password hash
- [ ] Fix the Sheets append URL bug in `admin.js`
- [ ] Update Google Maps embed with real coordinates
- [ ] Test report download flow end-to-end
- [ ] Test admin upload flow end-to-end
- [ ] Deploy to Netlify
- [ ] Connect custom domain
