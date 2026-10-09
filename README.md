# Riverside bathroom visualiser

Customer-facing bathroom visualiser for Riverside Construction Group, built by Blulabs.

- `index.html`: demo page (not indexed by search engines).
- `embed.html`: the snippet for Alex's Webflow site. It is under 2 KB and holds a normal, crawlable heading; the tool itself (`visualiser.js`) loads with `defer` and only mounts when a visitor scrolls near it, so it adds nothing to the page's first load.
- `visualiser.js`: the tool. Steps: bathroom type, contact details, photo, Design A and Design B, book a consultation, WhatsApp enquiry.
- `enquiry.html`: the page Alex opens from the WhatsApp message or email, with the customer's details, their photo and every design.

The image engine runs privately on Supabase; no keys or prompts live in this repo.
