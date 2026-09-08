<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Contact — Atlas Strength Club</title>
<meta name="description" content="Find Atlas Strength Club. Address, opening hours, and a contact form. We respond within a few hours."/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css"/>
<link rel="icon" type="image/x-icon" href="logo-white-icon.png">
<style>
/* ── PAGE-SPECIFIC OVERRIDES ── */
.contact-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 100vh;
  padding-top: var(--nav-h);
}

.contact-left {
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  padding: 80px 60px 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.contact-left::before {
  content: '';
  position: absolute;
  top: -120px; right: -120px;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(193,183,167,0.05) 0%, transparent 70%);
  pointer-events: none;
}

.contact-left::after {
  content: '';
  position: absolute;
  bottom: 40px; right: 40px;
  width: 160px; height: 160px;
  background: url('logo-gold-white.png') center/contain no-repeat;
  opacity: 0.06;
  pointer-events: none;
}

.contact-right {
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: var(--bg-primary);
}

.contact-info-grid {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 40px;
}

.contact-info-row {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.contact-info-icon {
  width: 48px; height: 48px;
  border-radius: 8px;
  background: rgba(193,183,167,0.08);
  border: 1px solid rgba(193,183,167,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
}

.contact-info-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 5px;
}

.contact-info-value {
  font-size: 0.9rem;
  color: rgba(240,237,232,0.8);
  line-height: 1.65;
}

.contact-info-value a {
  color: rgba(240,237,232,0.8);
  transition: color 0.2s;
}
.contact-info-value a:hover { color: var(--accent); }

.hours-block {
  margin-top: 44px;
  padding-top: 44px;
  border-top: 1px solid var(--border);
}

.hours-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
}

.hours-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.855rem;
}

.hours-row:last-child { border: none; }

.hours-day { color: rgba(240,237,232,0.45); font-size: 0.82rem; }
.hours-time { color: rgba(240,237,232,0.8); }
.hours-row.today .hours-day,
.hours-row.today .hours-time {
  color: var(--text-primary);
  font-weight: 600;
}

/* Map */
.map-block {
  margin-top: 44px;
  padding-top: 44px;
  border-top: 1px solid var(--border);
}

.map-embed {
  width: 100%;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.map-embed iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

/* Form side */
.form-heading {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1.05;
  margin-bottom: 8px;
}

.form-sub {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 36px;
  line-height: 1.65;
}

.atlas-after {
  margin-top: 60px;
  padding-top: 56px;
  border-top: 1px solid var(--border);
}

.atlas-after-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.atlas-after-label::before {
  content: '';
  display: block;
  width: 24px; height: 1px;
  background: var(--accent);
  opacity: 0.5;
}

.atlas-after-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1.05;
  margin-bottom: 20px;
}

.atlas-after-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.atlas-after-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 28px 24px;
  transition: border-color 0.2s, transform 0.2s;
}

.atlas-after-card:hover {
  border-color: var(--border-accent);
  transform: translateY(-3px);
}

.atlas-after-card__icon { font-size: 1.5rem; margin-bottom: 14px; }
.atlas-after-card__title {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.atlas-after-card__text {
  font-size: 0.83rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* Bottom CTA strip */
.cta-strip {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: 64px 0;
}

.cta-strip-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.cta-strip-text h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.cta-strip-text p {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .contact-split { grid-template-columns: 1fr; }
  .contact-left { padding: 60px 32px; border-right: none; border-bottom: 1px solid var(--border); }
  .contact-right { padding: 60px 32px; }
  .atlas-after-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .contact-left, .contact-right { padding: 48px 20px; }
  .atlas-after-grid { grid-template-columns: 1fr; }
  .cta-strip-inner { flex-direction: column; text-align: center; }
}
</style>
</head>
<body>

<nav class="nav scrolled" id="nav">
  <div class="container nav__inner">
    <a href="index.html" class="nav__logo">
      <img src="logo-gold-white.png" alt="Atlas Strength Club">
    </a>
    <ul class="nav__links">
      <li><a href="index.html">Home</a></li>
      <li><a href="membership.html">Membership</a></li>
      <li><a href="contact.html" class="active">Contact</a></li>
      <li><a href="faq.html">FAQ</a></li>
    </ul>
    <div class="nav__actions">
      <a href="trial.html" class="btn btn-primary">Start Free Trial</a>
    </div>
    <button class="nav__toggle" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="nav__mobile">
  <a href="index.html">Home</a>
  <a href="membership.html">Membership</a>
  <a href="contact.html">Contact</a>
  <a href="faq.html">FAQ</a>
  <a href="trial.html" class="btn btn-primary">Start Free Trial</a>
</div>

<!-- MAIN SPLIT -->
<div class="contact-split">

  <!-- LEFT: Info -->
  <div class="contact-left">
    <div class="section-label">Get in Touch</div>
    <h1>GET IN TOUCH</h1>
    <p style="font-size:0.9rem;color:var(--text-secondary);max-width:400px;line-height:1.7;">
      Drop in, call, or send a message. We respond to emails within a few hours during business hours. DMs on Instagram are usually faster.
    </p>

    <div class="contact-info-grid">
      <div class="contact-info-row reveal">
        <div class="contact-info-icon">📍</div>
        <div>
          <div class="contact-info-label">Address</div>
          <div class="contact-info-value">229 Oxford Street<br>Darlinghurst, NSW 2010</div>
        </div>
      </div>
      <div class="contact-info-row reveal" data-delay="1">
        <div class="contact-info-icon">📞</div>
        <div>
          <div class="contact-info-label">Phone</div>
          <div class="contact-info-value"><a href="tel:+61424241142">+61 424 241 142</a></div>
        </div>
      </div>
      <div class="contact-info-row reveal" data-delay="2">
        <div class="contact-info-icon">✉️</div>
        <div>
          <div class="contact-info-label">Email</div>
          <div class="contact-info-value"><a href="mailto:amer@atlasstrengthclub.com.au" style="color:var(--accent);">amer@atlasstrengthclub.com.au</a></div>
        </div>
      </div>
      <div class="contact-info-row reveal" data-delay="3">
        <div class="contact-info-icon">📸</div>
        <div>
          <div class="contact-info-label">Instagram</div>
          <div class="contact-info-value">
            <a href="https://www.instagram.com/atlas_strength_club/" target="_blank" style="color:var(--accent);">@atlas_strength_club</a><br>
            <span style="font-size:0.78rem;color:var(--text-muted);">DMs usually answered within an hour</span>
          </div>
        </div>
      </div>
    </div>

    <div class="hours-block reveal">
      <div class="hours-title">Opening Hours</div>
      <div class="hours-rows">
        <div class="hours-row" data-day="Monday"><span class="hours-day">Monday</span><span class="hours-time">6:00am – 10:00pm</span></div>
        <div class="hours-row" data-day="Tuesday"><span class="hours-day">Tuesday</span><span class="hours-time">6:00am – 10:00pm</span></div>
        <div class="hours-row" data-day="Wednesday"><span class="hours-day">Wednesday</span><span class="hours-time">6:00am – 10:00pm</span></div>
        <div class="hours-row" data-day="Thursday"><span class="hours-day">Thursday</span><span class="hours-time">6:00am – 10:00pm</span></div>
        <div class="hours-row" data-day="Friday"><span class="hours-day">Friday</span><span class="hours-time">6:00am – 10:00pm</span></div>
        <div class="hours-row" data-day="Saturday"><span class="hours-day">Saturday</span><span class="hours-time">7:00am – 8:00pm</span></div>
        <div class="hours-row" data-day="Sunday"><span class="hours-day">Sunday</span><span class="hours-time">7:00am – 8:00pm</span></div>
        <div class="hours-row" data-day="Public Holiday"><span class="hours-day">Public Holidays</span><span class="hours-time">9:00am – 5:00pm</span></div>
      </div>
    </div>

    <div class="map-block reveal">
      <div class="hours-title">Location</div>
      <div class="map-embed">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.3225453933906!2d151.21809!3d-33.881346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae1a77b6c0eb%3A0xddb7dfb3dec55b09!2s229%20Oxford%20St%2C%20Darlinghurst%20NSW%202010!5e0!3m2!1sen!2sau!4v1779509487461!5m2!1sen!2sau"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </div>

  <!-- RIGHT: Form -->
  <div class="contact-right">
    <div class="form-heading">Send us<br>a message.</div>
    <p class="form-sub">General enquiries, membership questions, personal training — whatever you need, we will point you in the right direction.</p>

    <form data-form="contact" novalidate style="display:flex;flex-direction:column;gap:18px;">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label" for="c-first">First Name *</label>
          <input class="form-input" type="text" id="c-first" name="first-name" placeholder="First name" required/>
        </div>
        <div class="form-group">
          <label class="form-label" for="c-last">Last Name *</label>
          <input class="form-input" type="text" id="c-last" name="last-name" placeholder="Last name" required/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="c-email">Email *</label>
        <input class="form-input" type="email" id="c-email" name="email" placeholder="your@email.com" required/>
      </div>
      <div class="form-group">
        <label class="form-label" for="c-phone">Phone</label>
        <input class="form-input" type="tel" id="c-phone" name="phone" placeholder="Optional"/>
      </div>
      <div class="form-group">
        <label class="form-label" for="c-subject">What is this about?</label>
        <select class="form-select form-input" id="c-subject" name="subject">
          <option value="">Select a topic</option>
          <option>Membership enquiry</option>
          <option>Personal training</option>
          <option>Class information</option>
          <option>Free trial</option>
          <option>Facilities question</option>
          <option>Lost property</option>
          <option>Feedback or complaint</option>
          <option>Something else</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="c-message">Message *</label>
        <textarea class="form-textarea" id="c-message" name="message" placeholder="How can we help?" style="min-height:130px;" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:4px;">
        Send Message
      </button>
      <p style="font-size:0.72rem;color:var(--text-muted);text-align:center;margin-top:0;">We reply within a few hours during business hours.</p>
    </form>

    <!-- Atlas After -->
    <div class="atlas-after">
      <div class="atlas-after-label">After Hours</div>
      <div class="atlas-after-title">Need us outside<br>opening hours?</div>
      <p style="font-size:0.9rem;color:var(--text-secondary);max-width:420px;line-height:1.65;margin-bottom:0;">
        For urgent membership or facility issues outside staffed hours, DM us on Instagram or email — we’ll get back to you as soon as we’re open.
      </p>
      <div class="atlas-after-grid">
        <div class="atlas-after-card">
          <div class="atlas-after-card__icon">📱</div>
          <div class="atlas-after-card__title">Instagram DM</div>
          <div class="atlas-after-card__text">Fastest way to reach us. Usually answered within the hour during the day.</div>
        </div>
        <div class="atlas-after-card">
          <div class="atlas-after-card__icon">✉️</div>
          <div class="atlas-after-card__title">Email</div>
          <div class="atlas-after-card__text">amer@atlasstrengthclub.com.au — we check this several times a day.</div>
        </div>
        <div class="atlas-after-card">
          <div class="atlas-after-card__icon">🔑</div>
          <div class="atlas-after-card__title">24/7 Access</div>
          <div class="atlas-after-card__text">Members with 24-hour access can still train outside staffed hours.</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- CTA Strip -->
<section class="cta-strip">
  <div class="container">
    <div class="cta-strip-inner">
      <div class="cta-strip-text">
        <h3>Ready to train?</h3>
        <p>Start with a free trial session — no commitment required.</p>
      </div>
      <a href="trial.html" class="btn btn-primary btn-lg">Start Free Trial</a>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <!-- OLD LOGO KEPT (original base64) -->
        <a href="index.html"><div class="footer__logo"><img style="height:70px;width:auto;" src="data:image/png;base64,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" alt="Atlas Strength Club" style="height:70px;width:auto;"></div></a>
        <p class="footer__tagline">Forge your legacy. Every rep, every session, every day.</p>
        <div class="footer__socials">
          <a href="https://www.instagram.com/atlas_strength_club/" target="_blank" class="footer__social" aria-label="Instagram">📷</a>
          <a href="#" class="footer__social" aria-label="Facebook">📘</a>
          <a href="#" class="footer__social" aria-label="TikTok">🎵</a>
          <a href="#" class="footer__social" aria-label="YouTube">▶️</a>
        </div>
      </div>
      <div>
        <div class="footer__col-title">Train</div>
        <ul class="footer__links">
          <li><a href="membership.html">Membership</a></li>
          <li><a href="classes.html">Timetable</a></li>
          <li><a href="facilities.html">Facilities</a></li>
        </ul>
      </div>
      <div>
        <div class="footer__col-title">Info</div>
        <ul class="footer__links">
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="trial.html">Start Free Trial</a></li>
        </ul>
      </div>
      <div>
        <div class="footer__col-title">Visit</div>
        <ul class="footer__links">
          <li>229 Oxford Street<br>Darlinghurst, NSW 2010</li>
          <li>Mon–Fri: 6am–10pm</li>
          <li>Sat–Sun: 7am–8pm</li>
          <li><a href="tel:+61424241142">+61 424 241 142</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="footer__copy">© 2026 Atlas Strength Club. All rights reserved.</div>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
<script src="js/logos.js"></script>
<script>
// Highlight today's hours
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const today = days[new Date().getDay()];
document.querySelectorAll('.hours-row').forEach(row => {
  if (row.dataset.day === today) row.classList.add('today');
});
</script>
</body>
</html>
