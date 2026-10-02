# Portfolio review branch

The public portfolio uses Dane Anderson’s name and the label **Interviews** throughout. It removes the old tagline and personal photograph, includes the owner’s revised dissertation and teaching descriptions, links to ProQuest TDM Studio, and uses danecoleanderson@gmail.com for contact.

## Interview delivery

`npm run dev`, `npm run build`, and `npm run build:dev` run `scripts/export-interviews.mjs` first. The export fetches only published interviews from the public Sanity dataset and writes `public/interviews.json`, which is generated and ignored by Git. The browser loads that file from the site’s own origin. This fixes the confirmed Sanity “CORS Origin not allowed” response on Netlify preview domains without changing CMS permissions. Drafts, future posts, blogs, and reviews are excluded. The build fails on an unavailable, empty, duplicate, or incomplete export. CMS edits become public on the next successful site build.

All 15 existing interview slugs and transcripts are preserved. Legacy interview and course routes redirect to their new collection pages. Sanity source records are retained.

## Domain and launch

The owner purchased danecoleanderson.com and deactivated the X account. Canonicals, sitemap, robots.txt, and CNAME use the purchased domain. Netlify domain connection, Porkbun DNS, HTTPS verification, and production launch remain pending. Keep the old domain connected and preserve interview paths when redirecting. Do not use the legacy manual GitHub Pages workflow for this Netlify site.

## Checks

Production build, application TypeScript, changed-code lint, and whitespace checks pass. The production export contains the same 15 interview URLs as the sitemap, with nonempty bodies. Hosted verification follows each preview deployment.
