// Protect Material Icons from being translated into text
document.querySelectorAll('.material-symbols-outlined').forEach(function(icon) {
  icon.classList.add('notranslate');
});

// HBG Language Switcher - Google Translate Integration
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'de',
    includedLanguages: 'en,sq,ar,fr,it,pl,ru,es,tr',
    autoDisplay: false
  }, 'google_translate_element');
}

function toggleLangMenu(e) {
  e.stopPropagation();
  var dd = document.getElementById('lang-dropdown');
  dd.classList.toggle('hidden');
}

function setLang(langCode, label) {
  var currentLang = localStorage.getItem('hbg-lang') || 'de';

  // Update button label
  var btn = document.getElementById('lang-btn-label');
  if (btn) btn.textContent = label;

  var dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.add('hidden');

  try {
    localStorage.setItem('hbg-lang', langCode);
    localStorage.setItem('hbg-lang-label', label);
  } catch(e) {}

  if (langCode === 'de') {
    if (currentLang !== 'de') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      window.location.reload();
    }
    return;
  }

  var select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = langCode;
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', false, true);
    select.dispatchEvent(evt);
  }

  // Force nav button visibility after Google Translate processes the page
  setTimeout(function() { _hbgForceNavBtn(); }, 800);
  setTimeout(function() { _hbgForceNavBtn(); }, 2000);
  setTimeout(function() { _hbgForceNavBtn(); }, 4000);
}

// Close dropdown on outside click
document.addEventListener('click', function (e) {
  var wrap = document.getElementById('lang-switcher-wrap');
  if (wrap && !wrap.contains(e.target)) {
    var dd = document.getElementById('lang-dropdown');
    if (dd) dd.classList.add('hidden');
  }
});

// Restore saved language on page load
window.addEventListener('load', function () {
  try {
    var lang  = localStorage.getItem('hbg-lang');
    var label = localStorage.getItem('hbg-lang-label');
    var btn   = document.getElementById('lang-btn-label');
    if (lang && label && btn && lang !== 'de') {
      btn.textContent = label;
      // Wait for Google Translate to initialize
      setTimeout(function () { setLang(lang, label); }, 1800);
    }
  } catch(e) {}
});

// \u2500\u2500 BUNKER-FIX 6.0: NAV-BUTTON GUARDIAN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// MutationObserver + setInterval watchdog ensures the mobile nav button
// is NEVER hidden or removed by Google Translate DOM mutations.
// The icon is rendered via CSS ::before (immune to GT), this guardian
// only needs to ensure the button element itself stays visible.

function _hbgForceNavBtn() {
  var ids = ['btn-v8', 'nav-x1', 'mobile-menu-btn'];
  for (var i = 0; i < ids.length; i++) {
    var btn = document.getElementById(ids[i]);
    if (btn && window.innerWidth < 768) {
      btn.style.setProperty('display', 'flex', 'important');
      btn.style.setProperty('visibility', 'visible', 'important');
      btn.style.setProperty('opacity', '1', 'important');
      btn.style.setProperty('pointer-events', 'auto', 'important');
      btn.style.setProperty('z-index', '99999', 'important');
      btn.style.setProperty('width', '44px', 'important');
      btn.style.setProperty('height', '44px', 'important');
      // Remove any <font> tags Google Translate may have injected
      var fonts = btn.querySelectorAll('font');
      for (var j = 0; j < fonts.length; j++) {
        fonts[j].remove();
      }
    }
  }
}

// MutationObserver watching for Google Translate DOM changes
(function() {
  if (typeof MutationObserver === 'undefined') return;

  var headerEl = document.querySelector('header');
  if (!headerEl) return;

  var observer = new MutationObserver(function() {
    _hbgForceNavBtn();
  });

  observer.observe(headerEl, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });

  // Also observe body for Google Translate's wrapper injection
  var bodyObserver = new MutationObserver(function() {
    _hbgForceNavBtn();
  });
  bodyObserver.observe(document.body, {
    childList: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
})();

// Fallback polling watchdog (every 500ms)
setInterval(_hbgForceNavBtn, 500);
