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

// ===== Inquiry form (Formspree AJAX) — only on the Order page =====
const form = document.getElementById('inquiryForm');
const status = document.getElementById('formStatus');

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
