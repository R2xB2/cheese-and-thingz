# Cheese and Thingz — Website

Static showcase + inquiry site for **Cheese and Thingz**, artisan charcuterie boards (East Dundee, IL).
Built to be hosted **free on GitHub Pages** under your `R2xB2` account.

- Shared assets: `styles.css`, `script.js`, `assets/`

> 📎 The **business plan** (`BUSINESS_PLAN.md`), **pitch deck** (`business-plan-slides.html`),
> and the generated **PDF** are kept **out of this public repo** on purpose (see `.gitignore`).
> They live only on the owner's computer.

**Pages** (each section is its own page, sharing one nav + footer):

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| Boards / menu | `boards.html` |
| Gallery | `gallery.html` |
| How it Works | `how-it-works.html` |
| FAQ | `faq.html` |
| Order a Board | `order.html` |
| Thank-you (after form submit) | `thank-you.html` |

To change the nav, footer, or brand colors, note they're duplicated in each `.html` file
(nav + footer) and centralized in `styles.css` (colors/fonts). Edit `styles.css` once for
theme changes; edit each page's `<header>`/`<footer>` if you add/rename a page.

---

## 🔧 5-minute setup checklist

### 1. Add the logo
Save the Cheese and Thingz logo as:
```
assets/logo.png
```
The site (hero, nav, favicon) picks it up automatically. Square/circular PNG works best.

### 2. Wire up the inquiry form (so orders email you)
The form uses **[Formspree](https://formspree.io)** — free, no server needed.
1. Sign up at formspree.io with your email.
2. Create a new form → copy its endpoint (looks like `https://formspree.io/f/abcd1234`).
3. In `order.html`, find `YOUR_FORM_ID` and replace the whole URL with your endpoint.

On a successful submit, visitors are sent to `thank-you.html`.

Until you do this, the form shows a friendly "not connected yet" message instead of failing.

### 3. Add real board photos (gallery)
In `gallery.html`, replace each gallery placeholder:
```html
<figure class="gallery__item"><span>Your board photo</span></figure>
```
with:
```html
<figure class="gallery__item"><img src="assets/board1.jpg" alt="Charcuterie board" /></figure>
```
Drop the images into `assets/`.

### 4. Update social + contact links
Instagram is already wired to **instagram.com/cheeseandthingz** in every footer. Still to do:
- **Facebook** — replace the `<a href="#" aria-label="Facebook">` links with your page URL (in each `.html` footer).
- **Email** — replace the placeholder `mailto:hello@cheeseandthingz.com` with your real address (in each footer).

### 5. Swap the placeholder reviews
The home page (`index.html`) has 3 sample reviews in the `reviews` section. Replace the quote
text and `<cite>` names with real customer reviews as they come in.

### 6. (Important) Update the share-preview URLs
Every page has Open Graph tags so the link shows the logo + a description when shared on
Instagram/Facebook/text. They point at `https://R2xB2.github.io/cheese-and-thingz/...`.
**If you use a custom domain, find-and-replace that base URL** across the `.html` files
(and the form's `_next` field in `order.html`).

---

## 🚀 Deploy to GitHub Pages

1. Create a repo on your `R2xB2` account (e.g. `cheese-and-thingz`).
2. Push these files to the repo root:
   ```bash
   cd cheese-and-thingz
   git init
   git add .
   git commit -m "Launch Cheese and Thingz website"
   git branch -M main
   git remote add origin https://github.com/R2xB2/cheese-and-thingz.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `root` → Save.**
4. Your site goes live at `https://R2xB2.github.io/cheese-and-thingz/` in a minute or two.

### Custom domain (optional)
Buy a domain (e.g. `cheeseandthingz.com`, ~$12/yr), then in **Settings → Pages → Custom domain** enter it, and add the DNS records GitHub shows you. Add a file named `CNAME` containing just your domain.

---

## 🎨 Brand / theme
Colors are pulled straight from the logo and defined at the top of `styles.css`:

| Token | Color | From |
|---|---|---|
| `--mauve` | `#6f6772` | logo background |
| `--rose` | `#e0a9a0` | the rose |
| `--sage` | `#a9c1a4` | the leaves |
| `--cream` | `#f6f1ea` | the text |

Fonts: **Cormorant Garamond** (headings) + **Jost** (body), loaded from Google Fonts.

---

## Preview locally
```bash
cd cheese-and-thingz
python3 -m http.server 8000
# open http://localhost:8000
```

## Later: online ordering + payment
When you're ready to take payment online (Square/Stripe), the "full ordering" path
means moving off pure static hosting or embedding a Square "Buy Button." Just ask
and we'll add it.
