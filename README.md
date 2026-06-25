# Trims by Trent — Website (v2)

Precision cuts. Fantasy colors. Gender-affirming, judgment-free hair studio in Pocatello, ID.

## File Structure

```
trims-by-trent-v2/
├── index.html         ← Main page
├── thank-you.html      ← Shown after contact form submits
├── css/
│   └── style.css       ← All styles (mobile-first, responsive)
├── js/
│   └── main.js         ← Nav toggle, form validation, scroll reveal
├── netlify.toml         ← Netlify deploy config
└── README.md
```

## Deploying to Netlify (Free)

1. Go to https://netlify.com and sign up / log in
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop this entire `trims-by-trent-v2` folder onto the page
4. Your site is live at a free URL like `trims-by-trent.netlify.app`

The contact form works automatically once deployed — Netlify detects the
hidden form in `index.html` at build time and wires up form handling.
No extra setup needed. Submissions go to **Netlify → your site → Forms**,
where you can also turn on **email notifications** so submissions land
directly in Trent's inbox.

### To turn on email notifications:
1. Netlify dashboard → your site → **Forms** → **Settings and usage**
2. Click **Add notification** → **Email notification**
3. Enter the email you want submissions sent to
4. Save — every form submission now also arrives by email

### To connect a custom domain later:
- Netlify: Site Settings → Domain Management → Add custom domain
- Buy a domain at https://porkbun.com (~$10/yr) and point it to Netlify

## Updating Content

- **Prices** — not shown yet; add a `.svc-sub` line under any service in `index.html` if you want to display pricing later
- **Address** — `index.html`, under `.alt-item` → "Location"
- **Email / Instagram** — update both the visible text and the `href`/`mailto:` in `index.html` (appears in hero, contact section, and footer)
- **Services** — each is a `.svc-row` block in the `#services` section; copy/paste the pattern to add more

## Adding Real Scheduling Later (Phase 2)

When ready, the cleanest options are:
- **Square Appointments** (free) — handles booking, deposits, and cancellation fees
- **Cal.com** (free, open source) — pairs with Stripe for prepayment

Either gives you an embed snippet — drop it into a new section in
`index.html` (duplicate the `.contact-section` structure as a template)
and link a nav item to it.

## Notes on the Contact Form

- Uses **Netlify Forms** — completely free, no backend needed
- Includes a honeypot field (`bot-field`) to block basic spam bots
- Redirects to `thank-you.html` after a successful submission
- `js/main.js` includes a fallback: if the page is ever opened directly
  from a folder (not deployed), it opens the visitor's email client
  instead of silently failing
