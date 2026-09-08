/* Atlas Strength Club — main.js */

(function () {
  'use strict';

  /* ── NAV: scroll class ───────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    const applyScroll = () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    applyScroll();
    window.addEventListener('scroll', applyScroll, { passive: true });
  }

  /* ── NAV: mobile toggle ──────────────────────────── */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('open', !expanded);
    });

    // Close on any link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ── SCROLL REVEAL ───────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ── FAQ ─────────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── FORM HANDLING (generic) ─────────────────────── */
  const _atlasDb = (typeof supabase !== 'undefined' && typeof SUPABASE_URL !== 'undefined')
    ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

  document.querySelectorAll('[data-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const type = form.dataset.form;
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn ? btn.textContent : '';

      if (type === 'login') return; // handled by auth.js

      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }

      const fd = new FormData(form);
      const get = (key) => (fd.get(key) || '').toString().trim();

      try {
        if (!_atlasDb) throw new Error('Booking system unavailable — please try again shortly.');

        if (type === 'trial') {
          const { error } = await _atlasDb.from('trial_submissions').insert([{
            first_name:      get('first-name'),
            last_name:       get('last-name'),
            email:           get('email'),
            phone:           get('phone') || null,
            goal:            get('goal') || null,
            preferred_time:  get('preferred-time') || null,
            message:         get('message') || null
          }]);
          if (error) throw error;
          showSuccess(form, 'Trial booked! We\'ll be in touch within a few hours.');
          form.reset();
        } else if (type === 'contact') {
          const { error } = await _atlasDb.from('contact_submissions').insert([{
            first_name: get('first-name'),
            last_name:  get('last-name'),
            email:      get('email'),
            phone:      get('phone') || null,
            subject:    get('subject') || null,
            message:    get('message')
          }]);
          if (error) throw error;
          showSuccess(form, 'Message sent. We\'ll reply within one business day.');
          form.reset();
        } else {
          showSuccess(form, 'Submitted successfully.');
        }

        if (btn) btn.textContent = '✓ Done';
      } catch (err) {
        console.error('Form submission error:', err);
        showSuccess(form, 'Something went wrong sending that — please try again or contact us directly.');
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      }
    });
  });

  function showSuccess(form, message) {
    let notice = form.querySelector('.form-success');
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'form-success';
      notice.style.cssText = `
        background: rgba(193,183,167,0.08);
        border: 1px solid rgba(193,183,167,0.3);
        border-radius: 4px;
        padding: 14px 18px;
        font-size: 0.855rem;
        color: #C1B7A7;
        margin-top: 8px;
        line-height: 1.6;
      `;
      form.appendChild(notice);
    }
    notice.textContent = message;
    notice.style.display = 'block';
  }

  /* ── COPY BUTTONS ────────────────────────────────── */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.copy);
      const text = target ? target.textContent : btn.dataset.text || '';
      if (text) {
        navigator.clipboard.writeText(text.trim()).then(() => {
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = orig; }, 2000);
        });
      }
    });
  });

  /* ── TODAY HIGHLIGHT (hours table) ──────────────── */
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = dayNames[new Date().getDay()];
  document.querySelectorAll('.hours-table tr').forEach(row => {
    const cell = row.cells[0];
    if (cell && cell.textContent.trim() === today) {
      row.classList.add('hours-today');
    }
  });

  /* ── SIGN OUT buttons ────────────────────────────── */
  document.querySelectorAll('[data-signout]').forEach(btn => {
    btn.addEventListener('click', async () => {
      // Handled by auth.js if loaded; fallback redirect
      if (window.atlasSignOut) {
        await window.atlasSignOut();
      } else {
        window.location.href = 'login.html';
      }
    });
  });

})();
