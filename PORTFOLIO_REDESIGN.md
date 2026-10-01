# Dane Anderson portfolio — review draft

This branch turns the public publication into a personal portfolio. It has not been merged or deployed to production.

## Public pages

- `/`: personal introduction, research and teaching, interview series, favorite courses.
- `/about`: personal biography using the existing Lausanne photograph.
- `/research`: research and teaching overview.
- `/interviews`: complete searchable Humanities Last Chance interview series.
- `/article/:slug`: preserved interview addresses and original Sanity transcripts.
- `/courses`: original course collection, searchable by subject, title, and instructor.
- `/contact`: existing public email address.

`/articles/interviews`, `/resources`, and `/search` retain working redirects. Blog and review pages are retired, including direct article addresses: the new public interface queries only published interviews. Unavailable pages carry `noindex`. The underlying Sanity records remain intact; this is public removal, not permanent data deletion. Existing admin routes remain available.

## Domain and account follow-up

No domain was bought or changed. Before moving domains, set `VITE_SITE_URL` to the chosen domain, update `public/sitemap.xml`, `public/robots.txt`, `public/CNAME`, the manifest paths if needed, and hosting/DNS configuration. Preserve per-interview redirects from humanitieslastchance.org. Keep the current email address working until a replacement is verified.

The public portfolio has no Twitter/X profile links, share buttons, or account metadata. Account deactivation is a separate action and has not been completed by this code change.

## Review before launch

Review the homepage headline, biography, and research/teaching descriptions. No CV download is shown because no current CV file was supplied. Images are reused from the existing site. No new content or guest quotations have been invented.

Production build and TypeScript checks pass locally. Hosted visual and interaction checks are still required before merge. The local browser could not open a file-based preview because it permits only HTTP(S).
