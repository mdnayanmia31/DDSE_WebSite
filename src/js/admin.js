/* ============================================================
   DDSE — Admin Panel Logic
   Password gate, Google OAuth, Drive upload, Sheets append
   ============================================================ */

(function () {
  const gate = document.getElementById('admin-gate');
  const panel = document.getElementById('admin-panel-main');
  const pwForm = document.getElementById('admin-pw-form');
  const pwInput = document.getElementById('admin-password');
  const pwError = document.getElementById('admin-pw-error');
  if (!gate || !panel || !pwForm) return;

  // Check session
  if (sessionStorage.getItem('ddse_admin') === 'true') {
    gate.style.display = 'none';
    panel.style.display = 'block';
  }

  // ─── Password Gate ───
  pwForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pw = pwInput.value;
    const hash = await hashPassword(pw);
    if (typeof CONFIG !== 'undefined' && hash === CONFIG.ADMIN_PASSWORD_HASH) {
      sessionStorage.setItem('ddse_admin', 'true');
      gate.style.display = 'none';
      panel.style.display = 'block';
    } else {
      if (pwError) {
        pwError.textContent = 'Incorrect password — ভুল পাসওয়ার্ড';
        pwError.style.display = 'block';
      }
      pwInput.value = '';
    }
  });

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ─── Admin Tabs ───
  const tabBtns = document.querySelectorAll('.admin-tab');
  const tabPanels = document.querySelectorAll('.admin-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.panel);
      if (target) target.classList.add('active');
    });
  });

  // ─── Report Upload ───
  const reportForm = document.getElementById('upload-report-form');
  const reportStatus = document.getElementById('report-upload-status');
  if (reportForm) {
    reportForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = reportForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Uploading...';
      reportStatus.innerHTML = '<div class="loading-wrap"><div class="loading-spinner"></div><p class="loading-text">Uploading report...</p></div>';

      try {
        const clientName = document.getElementById('client-name').value.trim();
        const clientPhone = document.getElementById('client-phone').value.trim();
        const surveyType = document.getElementById('survey-type').value;
        const location = document.getElementById('survey-location').value.trim();
        const date = document.getElementById('survey-date').value;
        const description = document.getElementById('survey-desc').value.trim();
        const file = document.getElementById('report-file').files[0];

        if (!file) { showAdminError(reportStatus, 'Please select a PDF file.'); btn.disabled = false; btn.textContent = 'Upload & Register'; return; }

        const reportId = await generateReportId();
        const accessToken = await getAccessToken();
        if (!accessToken) { showAdminError(reportStatus, 'Google authentication required. Please sign in.'); btn.disabled = false; btn.textContent = 'Upload & Register'; return; }

        const driveFileId = await uploadToDrive(file, reportId, accessToken);
        await appendToSheets(reportId, clientPhone, clientName, surveyType, location, date, driveFileId, description, accessToken);

        reportStatus.innerHTML = `
          <div class="alert alert-success">
            <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <div class="alert-content">
              <strong>Report Uploaded Successfully — সফলভাবে আপলোড হয়েছে</strong>
              <p>Report ID: <strong style="font-family:var(--font-mono);color:var(--accent)">${reportId}</strong></p>
              <p>Share this ID with the client for downloading their report.</p>
            </div>
          </div>`;
        reportForm.reset();
      } catch (err) {
        console.error('Upload error:', err);
        showAdminError(reportStatus, 'Upload failed: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Upload & Register';
      }
    });
  }

  // ─── Gallery Upload ───
  const galleryForm = document.getElementById('upload-gallery-form');
  const galleryStatus = document.getElementById('gallery-upload-status');
  if (galleryForm) {
    galleryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = galleryForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Uploading...';

      try {
        const file = document.getElementById('gallery-file').files[0];
        const category = document.getElementById('gallery-category').value;
        if (!file) { showAdminError(galleryStatus, 'Please select an image.'); btn.disabled = false; btn.textContent = 'Upload Photo'; return; }

        const accessToken = await getAccessToken();
        if (!accessToken) { showAdminError(galleryStatus, 'Google authentication required.'); btn.disabled = false; btn.textContent = 'Upload Photo'; return; }

        await uploadGalleryPhoto(file, category, accessToken);
        galleryStatus.innerHTML = '<div class="alert alert-success"><div class="alert-content"><strong>Photo uploaded — ছবি আপলোড হয়েছে</strong></div></div>';
        galleryForm.reset();
      } catch (err) {
        showAdminError(galleryStatus, 'Upload failed: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Upload Photo';
      }
    });
  }

  // ─── Helper Functions ───
  async function generateReportId() {
    const year = new Date().getFullYear();
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEETS_ID}/values/${CONFIG.SHEET_RANGE}?key=${CONFIG.GOOGLE_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      const count = (data.values?.length || 1) - 1;
      return `DDSE-${year}-${String(count + 1).padStart(3, '0')}`;
    } catch {
      return `DDSE-${year}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
    }
  }

  let cachedToken = null;
  async function getAccessToken() {
    if (cachedToken) return cachedToken;
    return new Promise((resolve) => {
      if (typeof google === 'undefined' || !google.accounts) { resolve(null); return; }
      const client = google.accounts.oauth2.initTokenClient({
        client_id: CONFIG.OAUTH_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets',
        callback: (resp) => {
          if (resp.access_token) { cachedToken = resp.access_token; resolve(resp.access_token); }
          else resolve(null);
        }
      });
      client.requestAccessToken();
    });
  }

  async function uploadToDrive(file, reportId, token) {
    const metadata = { name: `${reportId}.pdf`, parents: [CONFIG.DRIVE_FOLDER_ID] };
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form
    });
    if (!res.ok) throw new Error('Drive upload failed');
    const data = await res.json();
    return data.id;
  }

  async function appendToSheets(reportId, phone, name, type, loc, date, driveId, desc, token) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEETS_ID}/values/Reports!A:I:append?valueInputOption=RAW`;
    const body = { values: [[reportId, phone, name, type, loc, date, driveId, desc, 'active']] };
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Sheets append failed');
  }

  async function uploadGalleryPhoto(file, category, token) {
    const metadata = { name: `${category}_${Date.now()}_${file.name}`, parents: [CONFIG.GALLERY_FOLDER_ID] };
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form
    });
    if (!res.ok) throw new Error('Gallery upload failed');
  }

  function showAdminError(container, msg) {
    container.innerHTML = `<div class="alert alert-error"><div class="alert-content"><strong>Error</strong><p>${msg}</p></div></div>`;
  }
})();
