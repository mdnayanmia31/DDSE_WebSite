const fs = require('fs');
if (fs.existsSync('config.js') && !process.env.CF_PAGES) process.exit(0);

const keys = ['GOOGLE_API_KEY', 'SHEETS_ID', 'SHEET_RANGE', 'DRIVE_FOLDER_ID',
              'GALLERY_FOLDER_ID', 'OAUTH_CLIENT_ID', 'ADMIN_PASSWORD_HASH'];
const cfg = Object.fromEntries(keys.map(k => [k, process.env[k] || '']));
if (!cfg.SHEET_RANGE) cfg.SHEET_RANGE = 'Reports!A:I';

fs.writeFileSync('config.js', 'const CONFIG = ' + JSON.stringify(cfg, null, 2) + ';\n');
