// ===== Year in footer =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Rotating food puns (home hero) =====
const punEl = document.getElementById('punRotator');
if (punEl) {
  const puns = [
    'You had me at cheese.',
    'Life is gouda.',
    "You're one in a melon.",
    'We go together like wine & brie.',
    'Have a brie-lliant day.',
    "It's nacho average board.",
    "Let's get this cheddar.",
    'Olive you so much.',
    'Grate things are coming.',
    "Provolone? Never — you'll never graze alone.",
    'Everything is better with brie.',
    'Feta late than never.',
    "We're on a roll — and a baguette.",
    'In brie we trust.',
    "You're my butter half.",
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % puns.length;
    punEl.style.opacity = '0';
    setTimeout(() => { punEl.textContent = puns[i]; punEl.style.opacity = '1'; }, 400);
  }, 3400);
}

// ===== Sticky nav shadow on scroll =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Mobile menu toggle =====
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav__links');
toggle.addEventListener('click', () => links.classList.toggle('is-open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('is-open'))
);

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.section, .card, .gallery__item, .how__steps li');
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ===== Board builder (build.html) =====
const builder = document.getElementById('builder');
if (builder) {
  const totalEl = document.getElementById('builderTotal');
  const reqBtn = document.getElementById('builderRequest');

  function refresh() {
    let total = 0;
    const chosen = { size: '', items: [] };
    const size = builder.querySelector('input[name="size"]:checked');
    if (size) { total += +size.dataset.price; chosen.size = size.dataset.label + ' — $' + size.dataset.price + ' base'; }
    builder.querySelectorAll('input[type="checkbox"]:checked').forEach(c => {
      total += +c.dataset.price;
      chosen.items.push(c.dataset.label + ' (+$' + c.dataset.price + ')');
    });
    totalEl.textContent = '$' + total;
    builder.querySelectorAll('.opt').forEach(o => {
      const i = o.querySelector('input');
      o.classList.toggle('sel', !!(i && i.checked));
    });
    builder._chosen = chosen;
    builder._total = total;
  }

  builder.addEventListener('change', refresh);
  refresh();

  reqBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const c = builder._chosen;
    if (!c.size) { alert('Please choose a board size first!'); return; }
    let summary = 'BUILD YOUR OWN BOARD\n';
    summary += 'Size: ' + c.size + '\n';
    summary += 'Selections:\n';
    summary += c.items.length ? '- ' + c.items.join('\n- ') : '- (base board only)';
    summary += '\nEstimated total: $' + builder._total;
    window.location.href = 'order.html?custom=' + encodeURIComponent(summary);
  });
}

// ===== Inquiry form (Formspree AJAX) — only on the Order page =====
const form = document.getElementById('inquiryForm');
const status = document.getElementById('formStatus');

// Prefill the order form from the board builder (?custom=...)
if (form) {
  const custom = new URLSearchParams(window.location.search).get('custom');
  if (custom) {
    const details = form.querySelector('[name="details"]');
    if (details) details.value = custom;
    const sel = form.querySelector('[name="board"]');
    if (sel) sel.value = 'Build Your Own Board';
  }
}

if (form) form.addEventListener('submit', async (e) => {
  // If the Formspree endpoint hasn't been set up yet, fall back to email.
  if (form.action.includes('YOUR_FORM_ID')) {
    e.preventDefault();
    status.className = 'form__status is-err';
    status.textContent = 'Form not connected yet — see README.md to add your Formspree ID (takes 2 minutes).';
    return;
  }

  e.preventDefault();
  status.className = 'form__status';
  status.textContent = 'Sending…';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      form.reset();
      status.className = 'form__status is-ok';
      status.textContent = 'Thanks a brie-llion! Redirecting…';
      window.location.href = 'thank-you.html';
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    status.className = 'form__status is-err';
    status.textContent = 'Something went wrong — please email us directly instead.';
  }
});
