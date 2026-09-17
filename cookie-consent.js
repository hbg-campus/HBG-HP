/**
 * Cookie Consent Manager - DSGVO/GDPR konforme Einwilligungsl\u00f6sung
 * Deutsche Bildungsgesellschaft GmbH
 *
 * Kategorien:
 *   - notwendig   (immer aktiv, keine Einwilligung n\u00f6tig)
 *   - statistik   (opt-in, deaktiviert by default)
 *   - marketing   (opt-in, deaktiviert by default)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'hbg_cookie_consent';
  const VERSION     = '1';

  // \u2500\u2500 CSS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  const CSS = `
    :root {
      --cc-primary:   #041627;
      --cc-secondary: #775a19;
      --cc-bg:        #ffffff;
      --cc-overlay:   rgba(4,22,39,0.55);
      --cc-radius:    1.5rem;
      --cc-shadow:    0 32px 80px -12px rgba(4,22,39,0.35);
    }

    #cc-overlay {
      position: fixed; inset: 0; z-index: 99998;
      background: var(--cc-overlay);
      backdrop-filter: blur(6px);
      opacity: 0;
      pointer-events: none;
      transition: opacity .4s ease;
    }
    #cc-overlay.cc-visible { opacity: 1; pointer-events: all; }

    #cc-banner {
      font-family: 'Manrope', sans-serif;
      position: fixed;
      inset-inline: 1rem;
      bottom: 1.25rem;
      max-width: 480px;
      margin-inline: auto;
      background: var(--cc-bg);
      border-radius: var(--cc-radius);
      box-shadow: var(--cc-shadow);
      padding: 2rem 2rem 1.75rem;
      z-index: 99999;
      transform: translateY(110%);
      opacity: 0;
      transition: transform .45s cubic-bezier(.22,.68,0,1.2), opacity .35s ease;
    }
    #cc-banner.cc-visible {
      transform: translateY(0);
      opacity: 1;
    }

    #cc-modal {
      font-family: 'Manrope', sans-serif;
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      pointer-events: none;
      opacity: 0;
      transition: opacity .3s ease;
    }
    #cc-modal.cc-visible { opacity: 1; pointer-events: all; }

    #cc-modal-box {
      background: var(--cc-bg);
      border-radius: var(--cc-radius);
      box-shadow: var(--cc-shadow);
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 2.25rem 2.25rem 2rem;
      transform: scale(.95);
      transition: transform .35s cubic-bezier(.22,.68,0,1.2);
    }
    #cc-modal.cc-visible #cc-modal-box { transform: scale(1); }

    /* \u2500\u2500 typography \u2500\u2500 */
    .cc-logo { display:flex; align-items:center; gap:.625rem; margin-bottom:1.1rem; }
    .cc-logo svg { width:1.75rem; height:1.75rem; flex-shrink:0; }
    .cc-logo-text { font-size:.7rem; font-weight:700; letter-spacing:.1em;
                    text-transform:uppercase; color: var(--cc-primary); opacity:.5; }

    .cc-title { font-family:'Newsreader',serif; font-size:1.35rem; font-weight:700;
                color: var(--cc-primary); margin-bottom:.6rem; line-height:1.2; }

    .cc-body { font-size:.82rem; color:#44474c; line-height:1.6; margin-bottom:1.4rem; }
    .cc-body a { color: var(--cc-secondary); text-decoration:underline; }

    /* \u2500\u2500 buttons \u2500\u2500 */
    .cc-btn-row { display:flex; gap:.6rem; flex-wrap:wrap; }
    .cc-btn {
      flex:1; min-width:7rem; padding:.65rem 1rem;
      border-radius:.75rem; font-size:.78rem; font-weight:700;
      cursor:pointer; border:none; transition: all .2s ease; text-align:center;
      letter-spacing:.02em;
    }
    .cc-btn:hover { transform:translateY(-1px); filter:brightness(1.06); }
    .cc-btn-accept-all {
      background: var(--cc-primary); color:#fff;
    }
    .cc-btn-reject {
      background: #f3f4f5; color: var(--cc-primary);
    }
    .cc-btn-settings {
      background: transparent; color: var(--cc-primary);
      border: 1.5px solid rgba(4,22,39,.15);
      font-size:.72rem; flex:0 0 auto; white-space:nowrap;
    }

    .cc-btn-save-settings {
      background: var(--cc-secondary); color:#fff; flex:none; min-width:10rem;
    }
    .cc-btn-close {
      background: #f3f4f5; color: var(--cc-primary); flex:none;
    }

    /* \u2500\u2500 toggles \u2500\u2500 */
    .cc-category { border-bottom:1px solid #f0f0f0; padding:.85rem 0; }
    .cc-category:last-child { border-bottom:none; }
    .cc-cat-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:.35rem; }
    .cc-cat-title { font-weight:700; font-size:.85rem; color: var(--cc-primary); }
    .cc-cat-badge { font-size:.65rem; font-weight:700; letter-spacing:.08em;
                    text-transform:uppercase; padding:.18rem .55rem; border-radius:999px; }
    .cc-badge-required { background:#e8f5e9; color:#2e7d32; }
    .cc-cat-desc { font-size:.77rem; color:#44474c; line-height:1.55; }

    /* toggle switch */
    .cc-toggle { position:relative; display:inline-block; width:2.75rem; height:1.5rem; flex-shrink:0; }
    .cc-toggle input { opacity:0; width:0; height:0; }
    .cc-slider {
      position:absolute; inset:0; background:#d9dadb; border-radius:999px;
      transition: background .25s;
    }
    .cc-slider::before {
      content:''; position:absolute; width:1.1rem; height:1.1rem;
      border-radius:999px; background:#fff; left:.2rem; top:.2rem;
      transition: transform .25s; box-shadow:0 1px 3px rgba(0,0,0,.2);
    }
    .cc-toggle input:checked + .cc-slider { background: var(--cc-primary); }
    .cc-toggle input:checked + .cc-slider::before { transform:translateX(1.25rem); }
    .cc-toggle input:disabled + .cc-slider { background:#041627; opacity:.35; cursor:not-allowed; }

    /* modal top row */
    .cc-modal-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; gap:1rem; }
    .cc-modal-title { font-family:'Newsreader',serif; font-size:1.5rem; font-weight:700; color: var(--cc-primary); }
    .cc-modal-close-btn {
      background:none; border:none; cursor:pointer; padding:.25rem;
      color:#44474c; font-size:1.4rem; line-height:1; flex-shrink:0;
    }
    .cc-modal-close-btn:hover { color: var(--cc-primary); }

    .cc-modal-actions { display:flex; gap:.6rem; flex-wrap:wrap; margin-top:1.5rem; }

    /* re-open button (fixed bottom-left) */
    #cc-reopen-btn {
      position:fixed; bottom:1.25rem; left:1.25rem; z-index:99990;
      background: var(--cc-primary); color:#fff;
      border:none; border-radius:999px;
      padding:.55rem 1.1rem; font-size:.73rem; font-weight:700;
      letter-spacing:.06em; text-transform:uppercase;
      cursor:pointer; box-shadow:0 4px 20px rgba(4,22,39,.3);
      transition: all .2s ease;
      display:flex; align-items:center; gap:.4rem;
      font-family:'Manrope',sans-serif;
    }
    #cc-reopen-btn:hover { transform:translateY(-2px); box-shadow:0 8px 25px rgba(4,22,39,.35); }
    #cc-reopen-btn.cc-hidden { display:none; }

    @media (max-width:480px){
      #cc-banner { padding:1.5rem; }
      .cc-btn-row { flex-direction:column; }
      .cc-btn-settings { flex:1; }
      #cc-modal-box { padding:1.5rem 1.25rem; }
      .cc-modal-actions { flex-direction:column; }
    }
  `;

  // \u2500\u2500 Helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  function injectCSS(css) {
    const el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  function getConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.version !== VERSION) return null;
      return data;
    } catch { return null; }
  }

  function saveConsent(prefs) {
    const data = {
      version:     VERSION,
      timestamp:   new Date().toISOString(),
      preferences: prefs
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Expose globally so other scripts can read it
    window.HBGConsent = data.preferences;
    // Fire event
    window.dispatchEvent(new CustomEvent('hbgCookieConsent', { detail: data }));
  }

  // \u2500\u2500 Build HTML \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  function buildBanner() {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <!-- Overlay (only used for modal) -->
      <div id="cc-overlay"></div>

      <!-- Banner -->
      <div id="cc-banner" role="dialog" aria-modal="true" aria-label="Cookie-Einstellungen">
        <div class="cc-logo">
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" fill="#041627"/>
            <circle cx="14" cy="14" r="4.5" fill="#775a19"/>
            <circle cx="8"  cy="8"  r="2"   fill="#775a19" opacity=".45"/>
            <circle cx="20" cy="9"  r="1.5" fill="#775a19" opacity=".35"/>
            <circle cx="19" cy="20" r="2"   fill="#775a19" opacity=".45"/>
          </svg>
          <span class="cc-logo-text">Deutsche Bildungsgesellschaft</span>
        </div>
        <p class="cc-title">Wir respektieren Ihre Privatsph\u00e4re \ud83d\udd12</p>
        <p class="cc-body">
          Wir verwenden Cookies, um Ihnen die bestm\u00f6gliche Erfahrung zu bieten. Technisch notwendige Cookies sind immer aktiv.
          Alle anderen Kategorien sind optional - Ihre Wahl gilt jederzeit widerrufbar.
          Mehr dazu in unserer <a href="datenschutz.html">Datenschutzerkl\u00e4rung</a>.
        </p>
        <div class="cc-btn-row">
          <button class="cc-btn cc-btn-accept-all" id="cc-accept-all">Alle akzeptieren</button>
          <button class="cc-btn cc-btn-reject"     id="cc-reject-all">Nur notwendige</button>
          <button class="cc-btn cc-btn-settings"   id="cc-open-settings">Einstellungen</button>
        </div>
      </div>

      <!-- Settings Modal -->
      <div id="cc-modal" role="dialog" aria-modal="true" aria-label="Cookie-Einstellungen">
        <div id="cc-modal-box">
          <div class="cc-modal-header">
            <span class="cc-modal-title">Cookie-Einstellungen</span>
            <button class="cc-modal-close-btn" id="cc-modal-close" aria-label="Schlie\u00dfen">&#x2715;</button>
          </div>
          <p class="cc-body">
            Hier k\u00f6nnen Sie Ihre Einwilligung f\u00fcr jede Kategorie einzeln erteilen oder widerrufen.
            Die Einstellungen werden dauerhaft in Ihrem Browser gespeichert.
          </p>

          <!-- Category: Notwendig -->
          <div class="cc-category">
            <div class="cc-cat-header">
              <span class="cc-cat-title">Notwendige Cookies</span>
              <div style="display:flex;align-items:center;gap:.6rem;">
                <span class="cc-cat-badge cc-badge-required">Immer aktiv</span>
                <label class="cc-toggle" title="Immer aktiv">
                  <input type="checkbox" checked disabled>
                  <span class="cc-slider"></span>
                </label>
              </div>
            </div>
            <p class="cc-cat-desc">
              Diese Cookies sind f\u00fcr das grundlegende Funktionieren der Website erforderlich und k\u00f6nnen nicht deaktiviert werden. Sie speichern keine personenbezogenen Daten.
            </p>
          </div>

          <!-- Category: Statistik -->
          <div class="cc-category">
            <div class="cc-cat-header">
              <span class="cc-cat-title">Statistik-Cookies</span>
              <label class="cc-toggle" title="Statistik-Cookies aktivieren">
                <input type="checkbox" id="cc-toggle-statistik">
                <span class="cc-slider"></span>
              </label>
            </div>
            <p class="cc-cat-desc">
              Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem Informationen anonym gesammelt und analysiert werden (z. B. Google Analytics).
            </p>
          </div>

          <!-- Category: Marketing -->
          <div class="cc-category">
            <div class="cc-cat-header">
              <span class="cc-cat-title">Marketing-Cookies</span>
              <label class="cc-toggle" title="Marketing-Cookies aktivieren">
                <input type="checkbox" id="cc-toggle-marketing">
                <span class="cc-slider"></span>
              </label>
            </div>
            <p class="cc-cat-desc">
              Diese Cookies werden verwendet, um Ihnen relevante Werbung auf anderen Websites anzeigen zu k\u00f6nnen. Sie werden von Drittanbietern gesetzt und k\u00f6nnen Ihr Browsing-Verhalten nachverfolgen.
            </p>
          </div>

          <div class="cc-modal-actions">
            <button class="cc-btn cc-btn-accept-all" id="cc-modal-accept-all">Alle akzeptieren</button>
            <button class="cc-btn cc-btn-save-settings" id="cc-save-settings">Auswahl speichern</button>
            <button class="cc-btn cc-btn-close" id="cc-modal-reject-all">Nur notwendige</button>
          </div>
        </div>
      </div>

      <!-- Re-open button (always visible after consent) -->
      <button id="cc-reopen-btn" class="cc-hidden" aria-label="Cookie-Einstellungen \u00f6ffnen">
        \ud83c\udf6a Cookies
      </button>
    `;
    document.body.appendChild(wrap);
  }

  // \u2500\u2500 Logic \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  function init() {
    injectCSS(CSS);
    buildBanner();

    const overlay       = document.getElementById('cc-overlay');
    const banner        = document.getElementById('cc-banner');
    const modal         = document.getElementById('cc-modal');
    const reopenBtn     = document.getElementById('cc-reopen-btn');
    const togStatistik  = document.getElementById('cc-toggle-statistik');
    const togMarketing  = document.getElementById('cc-toggle-marketing');

    function showBanner() {
      requestAnimationFrame(() => {
        banner.classList.add('cc-visible');
      });
      reopenBtn.classList.add('cc-hidden');
    }

    function hideBanner() {
      banner.classList.remove('cc-visible');
      overlay.classList.remove('cc-visible');
      reopenBtn.classList.remove('cc-hidden');
    }

    function openModal() {
      // Pre-fill toggles from saved prefs
      const saved = getConsent();
      if (saved) {
        togStatistik.checked = !!saved.preferences.statistik;
        togMarketing.checked = !!saved.preferences.marketing;
      }
      overlay.classList.add('cc-visible');
      modal.classList.add('cc-visible');
      banner.classList.remove('cc-visible');
    }

    function closeModal(keepBanner) {
      modal.classList.remove('cc-visible');
      overlay.classList.remove('cc-visible');
      if (keepBanner) banner.classList.add('cc-visible');
    }

    function acceptAll() {
      saveConsent({ notwendig: true, statistik: true, marketing: true });
      hideBanner();
      closeModal(false);
    }

    function rejectAll() {
      saveConsent({ notwendig: true, statistik: false, marketing: false });
      hideBanner();
      closeModal(false);
    }

    function saveSettings() {
      saveConsent({
        notwendig: true,
        statistik: togStatistik.checked,
        marketing: togMarketing.checked
      });
      hideBanner();
      closeModal(false);
    }

    // Banner buttons
    document.getElementById('cc-accept-all').addEventListener('click', acceptAll);
    document.getElementById('cc-reject-all').addEventListener('click', rejectAll);
    document.getElementById('cc-open-settings').addEventListener('click', openModal);

    // Modal buttons
    document.getElementById('cc-modal-accept-all').addEventListener('click', acceptAll);
    document.getElementById('cc-modal-reject-all').addEventListener('click', rejectAll);
    document.getElementById('cc-save-settings').addEventListener('click', saveSettings);
    document.getElementById('cc-modal-close').addEventListener('click', () => {
      const hasSaved = !!getConsent();
      closeModal(!hasSaved); // if no consent yet, show banner again
      if (!hasSaved) banner.classList.add('cc-visible');
      else reopenBtn.classList.remove('cc-hidden');
    });

    // Click outside modal box closes it
    overlay.addEventListener('click', () => {
      const hasSaved = !!getConsent();
      closeModal(!hasSaved);
      if (!hasSaved) banner.classList.add('cc-visible');
      else reopenBtn.classList.remove('cc-hidden');
    });

    // Re-open button
    reopenBtn.addEventListener('click', openModal);

    // \u2500\u2500 Entscheidung treffen \u2500\u2500
    const existingConsent = getConsent();
    if (existingConsent) {
      // Consent already given - expose it and show re-open button
      window.HBGConsent = existingConsent.preferences;
      reopenBtn.classList.remove('cc-hidden');
    } else {
      // No consent yet - show banner after main content has painted (LCP fix)
      setTimeout(showBanner, 2500);
    }
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // \u2500\u2500 Public API \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  window.HBGCookieConsent = {
    /** Returns the current preferences object, or null if no consent given yet */
    get: getConsent,
    /** Opens the settings modal programmatically */
    openSettings: function () {
      const modal = document.getElementById('cc-modal');
      if (modal) modal.classList.add('cc-visible');
    }
  };
})();
