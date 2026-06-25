/* ─────────────────────────────────────────
   TRIMS BY TRENT v2 — main.js
   ───────────────────────────────────────── */

/* ── Mobile nav toggle ── */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Contact form ──
   Netlify intercepts the real POST to "/" automatically once deployed
   (data-netlify="true" on the form). This handler is a graceful
   client-side fallback for environments where the page is opened
   directly (e.g. testing locally) before Netlify is hooked up. */
const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', (e) => {
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    let errorMsg = '';
    if (!name || !email || !message) {
      errorMsg = 'Please fill in all fields.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMsg = 'Please enter a valid email address.';
    }

    if (errorMsg) {
      e.preventDefault();
      showFormMsg(form, errorMsg, 'error');
      return;
    }

    // If running locally without Netlify (file:// or no internet),
    // fall back to opening the user's email client instead of
    // letting the POST fail silently.
    const isLocal = window.location.protocol === 'file:';
    if (isLocal) {
      e.preventDefault();
      const mailto = `mailto:hello@trimsbytrent.com?subject=Booking%20Inquiry&body=${encodeURIComponent(`Name: ${name}\n\nMessage: ${message}`)}`;
      window.location.href = mailto;
      return;
    }

    // Otherwise let the form submit normally — Netlify Forms handles it
    // and redirects to thank-you.html as set in the form's "action".
  });
}

function showFormMsg(form, text, type) {
  const existing = form.querySelector('.form-msg');
  if (existing) existing.remove();

  const msg = document.createElement('p');
  msg.className = `form-msg ${type}`;
  msg.textContent = text;
  form.appendChild(msg);

  if (type === 'success') {
    setTimeout(() => msg.remove(), 6000);
  }
}

/* ── Lightweight scroll-reveal ── */
const revealEls = document.querySelectorAll('.svc-row, .alt-item');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}
