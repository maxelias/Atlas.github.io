/* =====================================================
   ATLAS GYM — Supabase Auth
   ===================================================== */

(async () => {
  const client = window._supabaseClient;
  if (!client) return;

  if (document.querySelector('[data-form="login"]')) {
    // PKCE flow (Supabase v2 default): redirect lands with ?code= in query string
    const urlParams = new URLSearchParams(window.location.search);
    // Legacy implicit flow: token in hash fragment
    const hash      = new URLSearchParams(window.location.hash.slice(1));
    const authType  = hash.get('type');

    if (urlParams.has('code')) {
      showSetPasswordLoading();
      const { data, error } = await client.auth.exchangeCodeForSession(urlParams.get('code'));
      if (data?.session && !error) {
        history.replaceState(null, '', window.location.pathname);
        initSetPasswordPanel(client, 'magiclink');
      } else {
        initLoginPage(client);
      }
    } else if (authType === 'invite' || authType === 'recovery' || authType === 'magiclink') {
      initSetPasswordPanel(client, authType);
    } else {
      initLoginPage(client);
    }
  }

  if (document.body.dataset.page === 'dashboard') {
    await initDashboard(client);
  }
})();

/* ---- Loading state while PKCE code is exchanged --- */
function showSetPasswordLoading() {
  document.querySelector('.portal-tabs')?.style.setProperty('display', 'none');
  document.getElementById('tab-login').style.display = 'none';
  const panel = document.getElementById('tab-setpassword');
  panel.style.display = 'block';
  panel.querySelector('.portal-form-title').textContent = 'One moment…';
  document.getElementById('setpassword-sub').textContent = 'Verifying your link…';
  document.getElementById('setpassword-form').style.display = 'none';
}

/* ---- Invite / Password-Reset Handler -------------- */
function initSetPasswordPanel(client, type) {
  // Hide the tab switcher and normal panels, show set-password panel
  document.querySelector('.portal-tabs')?.style.setProperty('display', 'none');
  document.getElementById('tab-login')?.style.setProperty('display', 'none');
  const panel = document.getElementById('tab-setpassword');
  panel.style.display = 'block';
  panel.querySelector('.portal-form-title').textContent = 'Set your password.';
  document.getElementById('setpassword-form').style.display = 'flex';

  const subEl = document.getElementById('setpassword-sub');
  if (type === 'recovery') {
    subEl.textContent = 'Enter a new password for your Atlas account.';
  } else if (type === 'magiclink') {
    document.querySelector('#tab-setpassword .portal-form-title').textContent = 'Welcome to Atlas.';
    subEl.textContent = 'Set a password to secure your member account, then you\'re in.';
  }

  const form = document.getElementById('setpassword-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn      = form.querySelector('[type="submit"]');
    const password = document.getElementById('sp-pass').value;
    const confirm  = document.getElementById('sp-confirm').value;

    clearError(form);
    if (password !== confirm) { showError(form, 'Passwords do not match.'); return; }
    if (password.length < 8)  { showError(form, 'Password must be at least 8 characters.'); return; }

    btn.textContent = 'Saving...';
    btn.disabled = true;

    const { error } = await client.auth.updateUser({ password });

    if (error) {
      showError(form, friendlyAuthError(error.message));
      btn.textContent = 'Set Password & Log In';
      btn.disabled = false;
    } else {
      btn.textContent = '✓ Password set!';
      btn.style.background = '#2a7a2a';
      // Clear the hash so the token isn't reused
      history.replaceState(null, '', window.location.pathname);
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
    }
  });
}

/* ---- Login Page ------------------------------------ */
function initLoginPage(client) {
  const loginForm = document.querySelector('[data-form="login"]');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn      = loginForm.querySelector('[type="submit"]');
      const email    = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-pass').value;

      btn.textContent = 'Logging in...';
      btn.disabled = true;
      clearError(loginForm);

      const { error } = await client.auth.signInWithPassword({ email, password });

      if (error) {
        showError(loginForm, friendlyAuthError(error.message));
        btn.textContent = 'Log In';
        btn.disabled = false;
      } else {
        btn.textContent = '✓ Logged in!';
        btn.style.background = '#2a7a2a';
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
      }
    });
  }

  const registerForm = document.querySelector('[data-form="register"]');
  if (registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn       = registerForm.querySelector('[type="submit"]');
      const firstName = document.getElementById('reg-first').value.trim();
      const lastName  = document.getElementById('reg-last').value.trim();
      const email     = document.getElementById('reg-email').value.trim();
      const memberId  = document.getElementById('reg-member-id').value.trim();
      const password  = document.getElementById('reg-pass').value;
      const confirm   = document.getElementById('reg-confirm').value;

      clearError(registerForm);

      if (password !== confirm) { showError(registerForm, 'Passwords do not match.'); return; }
      if (password.length < 8)  { showError(registerForm, 'Password must be at least 8 characters.'); return; }

      btn.textContent = 'Creating account...';
      btn.disabled = true;

      const { error } = await client.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, last_name: lastName, member_id: memberId } }
      });

      if (error) {
        showError(registerForm, friendlyAuthError(error.message));
        btn.textContent = 'Create Account';
        btn.disabled = false;
      } else {
        const box = document.getElementById('tab-register');
        if (box) box.innerHTML = `
          <div style="text-align:center;padding:40px 0;">
            <div style="font-size:3rem;margin-bottom:20px;">✓</div>
            <div class="portal-form-title" style="margin-bottom:12px;">Check your email.</div>
            <p class="portal-form-sub">A confirmation link has been sent to
              <strong style="color:var(--text-primary);">${email}</strong>.<br>
              Click it to activate your account, then log in.</p>
          </div>`;
      }
    });
  }

  const forgotLink = document.querySelector('.forgot-link a');
  if (forgotLink) {
    forgotLink.addEventListener('click', async e => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email');
      const email = emailInput?.value.trim();
      if (!email) {
        emailInput?.focus();
        showError(document.querySelector('[data-form="login"]'), 'Enter your email above first.');
        return;
      }
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login.html',
      });
      if (!error) {
        forgotLink.textContent = '✓ Reset link sent';
        forgotLink.style.color = '#2a7a2a';
        forgotLink.style.pointerEvents = 'none';
      }
    });
  }
}

/* ---- Dashboard ------------------------------------ */
async function initDashboard(client) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) { window.location.href = 'login.html'; return; }

  const meta = session.user.user_metadata || {};
  const fullName = [meta.first_name, meta.last_name].filter(Boolean).join(' ') || session.user.email;
  const initials = meta.first_name
    ? (meta.first_name[0] + (meta.last_name?.[0] || '')).toUpperCase()
    : session.user.email[0].toUpperCase();

  document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = fullName);
  document.querySelectorAll('[data-user-email]').forEach(el => el.textContent = session.user.email);
  document.querySelectorAll('[data-user-initials]').forEach(el => el.textContent = initials);

  document.querySelectorAll('[data-signout]').forEach(btn => {
    btn.addEventListener('click', async () => {
      await client.auth.signOut();
      window.location.href = 'login.html';
    });
  });
}

/* ---- Helpers -------------------------------------- */
function showError(form, message) {
  let el = form.querySelector('.form-error');
  if (!el) {
    el = document.createElement('div');
    el.className = 'form-error';
    el.style.cssText = 'color:#e05555;font-size:0.82rem;padding:10px 14px;background:rgba(224,85,85,0.08);border:1px solid rgba(224,85,85,0.2);border-radius:var(--radius-sm);margin-bottom:4px;';
    form.prepend(el);
  }
  el.textContent = message;
}

function clearError(form) {
  form.querySelector('.form-error')?.remove();
}

function friendlyAuthError(msg) {
  if (msg.includes('Invalid login'))      return 'Incorrect email or password.';
  if (msg.includes('Email not confirmed')) return 'Please confirm your email before logging in.';
  if (msg.includes('already registered')) return 'An account with this email already exists.';
  return msg;
}