// config.example.js — Safe template. Copy to config.js and fill in real values.
// NEVER commit config.js to Git.
const CONFIG = {
  // Google API key (read-only, for Sheets public access)
  GOOGLE_API_KEY:       "AIzaSy...",

  // Google Sheets ID for report metadata
  SHEETS_ID:            "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",

  // Sheet range for report data
  SHEET_RANGE:          "Reports!A:I",

  // Google Drive folder ID for report PDFs
  DRIVE_FOLDER_ID:      "1a2b3c4d5e6f...",

  // Google Drive folder ID for gallery images
  GALLERY_FOLDER_ID:    "7g8h9i0j1k2l...",

  // OAuth 2.0 Client ID for admin panel (Drive/Sheets write access)
  OAUTH_CLIENT_ID:      "xxxx.apps.googleusercontent.com",

  // SHA-256 hash of admin password
  ADMIN_PASSWORD_HASH:  "a665a45920422f..."
};
