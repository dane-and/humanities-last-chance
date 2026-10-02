import { writeFile } from 'node:fs/promises';

// Export only public, published interviews. Serving this file from the site
// keeps previews and custom domains independent of Sanity browser CORS rules.
const query = "*[_type == \"post\" && !(_id in path(\"drafts.**\")) && lower(category) in [\"interview\", \"interviews\"] && defined(slug.current) && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))] | order(publishedAt desc) {_id, title, slug, excerpt, publishedAt, body, mainImage{asset->{url}, caption, alt}}";
const url = new URL('https://nzyg33ca.api.sanity.io/v2023-05-03/data/query/production');
url.searchParams.set('query', query);
const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error(`Interview export failed: HTTP ${response.status}`);
const { result } = await response.json();
if (!Array.isArray(result) || result.length === 0) {
  throw new Error('Interview export returned no interviews; refusing an empty deployment.');
}
const slugs = new Set();
for (const interview of result) {
  const slug = interview.slug?.current;
  if (!interview._id || !interview.title || !slug || slugs.has(slug) ||
      !(typeof interview.body === 'string' ? interview.body.trim() : Array.isArray(interview.body) && interview.body.length)) {
    throw new Error(`Invalid or incomplete interview: ${interview._id || 'unknown'}`);
  }
  slugs.add(slug);
}
await writeFile(new URL('../public/interviews.json', import.meta.url), JSON.stringify(result));
console.log(`Exported ${result.length} published interviews with complete transcripts.`);
