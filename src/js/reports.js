/* ============================================================
   DDSE — Reports Download Logic
   Fetches report metadata from Google Sheets, provides download
   ============================================================ */

(function () {
  const form = document.getElementById('report-form');
  const resultContainer = document.getElementById('report-result');
  const findBtn = document.getElementById('report-find-btn');
  if (!form || !resultContainer || !findBtn) return;

  findBtn.dataset.defaultText = findBtn.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const reportId = document.getElementById('report-id').value.trim().toUpperCase();
    const phone = document.getElementById('report-phone').value.trim();

    if (!reportId || !phone) {
      showError(resultContainer, 'Please enter both Report ID and Phone Number.');
      return;
    }

    setLoading(findBtn, resultContainer, true, 'Searching...');

    try {
      const report = await findReport(reportId, phone);
      if (report) {
        showResult(resultContainer, report);
      } else {
        showError(resultContainer, 'No report found with the given ID and phone number. Please check your details or contact our office.');
      }
    } catch (err) {
      console.error('Report fetch error:', err);
      showError(resultContainer, 'Unable to connect to the server. Please try again later or contact our office at 01754-012596.');
    } finally {
      setLoading(findBtn, resultContainer, false);
    }
  });

  async function findReport(reportId, phone) {
    if (typeof CONFIG === 'undefined') {
      throw new Error('Config not loaded');
    }
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEETS_ID}/values/${CONFIG.SHEET_RANGE}?key=${CONFIG.GOOGLE_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    if (!data.values || data.values.length < 2) return null;
    const rows = data.values.slice(1);
    return rows.find(r => r[0] === reportId && r[1] === phone && r[8] === 'active') || null;
  }

  function buildDownloadUrl(driveId) {
    return `https://drive.google.com/uc?export=download&id=${driveId}`;
  }

  function showResult(container, row) {
    const [id, phone, name, type, location, date, driveId, desc] = row;
    container.innerHTML = `
      <div class="alert alert-success">
        <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div class="alert-content"><strong>Report Found — রিপোর্ট পাওয়া গেছে</strong><p>Your survey report is ready for download.</p></div>
      </div>
      <div class="report-result">
        <div class="report-detail"><span>Report ID</span><span>${id}</span></div>
        <div class="report-detail"><span>Client Name</span><span>${name}</span></div>
        <div class="report-detail"><span>Survey Type</span><span>${type}</span></div>
        <div class="report-detail"><span>Location</span><span>${location}</span></div>
        <div class="report-detail"><span>Date</span><span>${date}</span></div>
        ${desc ? `<div class="report-detail"><span>Description</span><span>${desc}</span></div>` : ''}
        <div style="margin-top:var(--space-lg);text-align:center;">
          <a href="${buildDownloadUrl(driveId)}" class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF — পিডিএফ ডাউনলোড
          </a>
        </div>
      </div>
    `;
  }

  function showError(container, message) {
    container.innerHTML = `
      <div class="alert alert-error">
        <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <div class="alert-content"><strong>Not Found — রিপোর্ট পাওয়া যায়নি</strong><p>${message}</p></div>
      </div>
    `;
  }

  function setLoading(btn, container, isLoading, message) {
    btn.disabled = isLoading;
    btn.textContent = isLoading ? message : btn.dataset.defaultText;
    if (isLoading) {
      container.innerHTML = `<div class="loading-wrap"><div class="loading-spinner"></div><p class="loading-text">${message}</p></div>`;
    }
  }
})();
