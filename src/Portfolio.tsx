import React, { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { PortableText, sanityClient } from './lib/sanity';
import { disciplines } from './lib/data/youtubeUniversity';
import sanitizeHtml from 'sanitize-html';
import './portfolio.css';

type Interview = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  body?: React.ComponentProps<typeof PortableText>['value'] | string;
  mainImage?: { asset?: { url: string }; caption?: string; alt?: string };
};

const email = 'dane.anderson@humanitieslastchance.org';
const siteOrigin = (import.meta.env.VITE_SITE_URL || 'https://humanitieslastchance.org').replace(/\/$/, '');
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const portrait = asset('lovable-uploads/d2a073af-c735-4eba-b68f-8747596ab32c.png');
const painting = asset('lovable-uploads/f2ebe847-98d2-47f7-89c1-ee9c3175918f.png');
const nav = [['/about', 'About'], ['/research', 'Research & Teaching'], ['/interviews', 'Interviews'], ['/courses', 'Favorite Courses']];

export const interviewQuery = `*[_type == "post" && !(_id in path("drafts.**")) && lower(category) in ["interview", "interviews"] && defined(slug.current) && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))] | order(publishedAt desc) {_id, title, slug, excerpt, publishedAt, body, mainImage{asset->{url}, caption, alt}}`;
function useInterviews() {
  return useQuery<Interview[]>({ queryKey: ['portfolio-interviews'], queryFn: () => sanityClient.fetch(interviewQuery) });
}
function date(value?: string) {
  return value ? new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '';
}
function Metadata({ title, description, noindex = false, image }: { title: string; description: string; noindex?: boolean; image?: string }) {
  const { pathname } = useLocation();
  return <Helmet>
    <title>{title === 'Dane Anderson' ? title : `${title} | Dane Anderson`}</title>
    <meta name="description" content={description} />
    <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
    <meta property="og:title" content={title} /><meta property="og:description" content={description} />
    <meta property="og:site_name" content="Dane Anderson" /><meta property="og:type" content="website" />
    <meta property="og:url" content={`${siteOrigin}${pathname}`} />
    {image && <meta property="og:image" content={image} />}
    {!noindex && <link rel="canonical" href={`${siteOrigin}${pathname}`} />}
  </Helmet>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return <header className="pf-header">
    <Link to="/" className="pf-wordmark" aria-label="Dane Anderson — home">Dane Anderson<span>Literature · Ideas · Education</span></Link>
    <button className="pf-menu" aria-expanded={open} aria-controls="portfolio-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav id="portfolio-navigation" aria-label="Main navigation" className={open ? 'pf-nav is-open' : 'pf-nav'}>
      {nav.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
      <NavLink to="/contact">Contact <span aria-hidden="true">↗</span></NavLink>
    </nav>
  </header>;
}
function Footer() {
  return <footer className="pf-footer"><div><Link to="/" className="pf-footer-name">Dane Anderson</Link><p>Research, teaching, and conversations in the humanities.</p></div><div><Link to="/contact">Get in touch <span aria-hidden="true">↗</span></Link><span>© {new Date().getFullYear()} Dane Anderson</span></div></footer>;
}
function Intro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="pf-intro"><p className="pf-eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <div className="pf-lead">{children}</div>}</div>;
}
function InterviewCards({ interviews }: { interviews: Interview[] }) {
  return <div className="pf-interview-grid">{interviews.map(interview => <article className="pf-interview-card" key={interview._id}>
    {interview.mainImage?.asset?.url && <Link to={`/article/${interview.slug.current}`} tabIndex={-1} aria-hidden="true"><div className="pf-card-image"><img src={interview.mainImage.asset.url} alt="" loading="lazy" /></div></Link>}
    <p className="pf-date">{date(interview.publishedAt)}</p>
    <h3><Link to={`/article/${interview.slug.current}`}>{interview.title}</Link></h3>
    {interview.excerpt && <p>{interview.excerpt}</p>}
    <Link className="pf-text-link" to={`/article/${interview.slug.current}`}>Read the conversation <span aria-hidden="true">↗</span></Link>
  </article>)}</div>;
}
function Home() {
  const { data = [] } = useInterviews();
  const selected = ['hollis-robbins-on-ai-and-thinking-across-boundaries', 'stanley-fish-on-interpretive-communities-viewpoint-diversity-and-frank-sinatra', 'michael-clune-on-aesthetic-judgment-ai-and-the-future-of-the-english-departments'].map(slug => data.find(i => i.slug.current === slug)).filter((i): i is Interview => Boolean(i));
  return <>
    <Metadata title="Dane Anderson" description="Dane Anderson is a scholar, teacher, and interviewer working on literature, intellectual history, and the humanities." />
    <section className="pf-hero"><div className="pf-hero-copy"><p className="pf-eyebrow">Scholar · Teacher · Interviewer</p><h1>A life with<br /><em>books & ideas.</em></h1><p className="pf-hero-description">I’m Dane Anderson, a PhD candidate in English at the University of Michigan. I study nineteenth-century British literature and intellectual history, teach, and talk with scholars about their work.</p><div className="pf-actions"><Link className="pf-button" to="/about">More about me <span aria-hidden="true">↗</span></Link><Link className="pf-text-link" to="/interviews">Explore the interviews <span aria-hidden="true">→</span></Link></div></div>
    <figure className="pf-hero-art"><img src={painting} alt="A detail from Paolo Veronese’s The Wedding at Cana" /><figcaption>Paolo Veronese, <em>The Wedding at Cana</em>, 1563</figcaption></figure></section>
    <section className="pf-work" aria-labelledby="work-heading"><div className="pf-section-label"><p className="pf-eyebrow">An introduction</p><h2 id="work-heading">My work</h2></div><div className="pf-work-list">
      <Link to="/research"><span className="pf-number">01</span><div><h3>Research & teaching</h3><p>How minds shape knowledge. How literature teaches us to read, think, and judge.</p></div><span aria-hidden="true">↗</span></Link>
      <Link to="/interviews"><span className="pf-number">02</span><div><h3>Humanities Last Chance</h3><p>A series of fifteen long-form conversations with scholars about books, education, and intellectual life.</p></div><span aria-hidden="true">↗</span></Link>
      <Link to="/courses"><span className="pf-number">03</span><div><h3>Favorite courses</h3><p>Free lecture courses worth spending time with, from Shakespeare to the history of philosophy.</p></div><span aria-hidden="true">↗</span></Link>
    </div></section>
    <section className="pf-featured"><div className="pf-section-heading"><div><p className="pf-eyebrow">Humanities Last Chance · The interview series</p><h2>Conversations worth returning to.</h2></div><Link className="pf-text-link" to="/interviews">View the series <span aria-hidden="true">→</span></Link></div>{selected.length > 0 ? <InterviewCards interviews={selected} /> : <p>Conversations about literature, interpretation, AI, and the future of education. <Link to="/interviews">Explore the interview series.</Link></p>}</section>
  </>;
}
function About() {
  return <><Metadata title="About" description="About Dane Anderson, a scholar of British literature and intellectual history, teacher, and founder of Humanities Last Chance." />
    <Intro eyebrow="About me" title="Dane Anderson"><p>Scholar, teacher, and interviewer based in the Washington, D.C. area.</p></Intro>
    <div className="pf-about"><figure><img src={portrait} alt="Dane Anderson beside the Rue Edward-Gibbon sign in Lausanne, Switzerland" /><figcaption>Looking for Edward Gibbon in Lausanne, Switzerland.</figcaption></figure><div className="pf-prose"><p>I’m a PhD candidate in English Language and Literature at the University of Michigan. My research concerns nineteenth-century British literature and intellectual history, particularly how writers understood the relationship between the mind and the world.</p><p>My dissertation traces the history of subjectivity and objectivity in British thought. I’m interested in a tradition that understood imagination, judgment, and feeling as conditions of knowledge.</p><p>I’ve taught first-year writing, Shakespeare, and the Bible as literature at the University of Michigan, and the Bible as literature at George Mason University.</p><p>I also founded <Link to="/interviews">Humanities Last Chance</Link>, a public-humanities project. Its interview series brings together fifteen conversations I researched, conducted, and edited with scholars working across literature, history, religion, and education.</p><p>This site collects that work alongside <Link to="/courses">some of my favorite free courses</Link>.</p><Link className="pf-text-link" to="/contact">Get in touch <span aria-hidden="true">↗</span></Link></div></div>
  </>;
}
function Research() {
  return <><Metadata title="Research & Teaching" description="Dane Anderson’s research on subjectivity and objectivity in nineteenth-century Britain, and teaching in literature and writing." /><Intro eyebrow="Research & teaching" title="Literature, knowledge, and judgment."><p>My work brings literary study into conversation with the history of philosophy and the practice of teaching.</p></Intro><div className="pf-essay-sections"><section><p className="pf-eyebrow">Research</p><div className="pf-prose"><h2>Subjectivity and objectivity in nineteenth-century Britain</h2><p>We often describe objectivity as freedom from subjective influence. My dissertation examines an earlier tradition in which the mind’s activity was necessary to objective knowledge. Writers including Samuel Taylor Coleridge, Thomas Carlyle, and William Whewell treated imagination and judgment as powers through which we come to know the world.</p><p>Through close reading and the conceptual history of “subjective” and “objective,” I trace how that understanding developed and changed in nineteenth-century British prose. The project combines literary and philosophical texts with research in the periodical archive.</p></div></section><section><p className="pf-eyebrow">Teaching</p><div className="pf-prose"><h2>Reading closely. Making an argument.</h2><p>My teaching experience includes first-year writing, Shakespeare, and the Bible as literature at the University of Michigan, and RELI 235, “The Bible Is Literature,” at George Mason University.</p><p>I’m interested in how students learn to interpret difficult texts, support claims with evidence, and revise their judgments through discussion and writing.</p><p>My interviews with scholars also explore these questions, including how AI may change reading, writing, and education.</p><Link className="pf-text-link" to="/interviews">Read the conversations <span aria-hidden="true">→</span></Link></div></section></div></>;
}
function InterviewSeries() {
  const { data = [], isPending, isError, refetch } = useInterviews();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const filtered = data.filter(i => `${i.title} ${i.excerpt || ''}`.toLowerCase().includes(query.toLowerCase()));
  return <><Metadata title="Humanities Last Chance — Interviews" description="Fifteen long-form interviews conducted and edited by Dane Anderson, on literature, history, religion, AI, and education." /><Intro eyebrow="The interview series · 2025" title="Humanities Last Chance"><p>Fifteen conversations about the humanities and the people who practice them. I researched, conducted, and edited this series to bring scholars’ work to readers beyond the university.</p></Intro><div className="pf-collection-bar"><span>{isPending ? 'Loading the collection…' : `${data.length} conversations`}</span><label className="pf-search"><span className="sr-only">Search interviews by name or topic</span><input type="search" placeholder="Search by name or topic" value={query} onChange={e => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })} /></label></div>
    {isPending ? <p role="status" className="pf-status">Loading interviews…</p> : isError ? <div className="pf-status" role="alert"><p>The interviews couldn’t be loaded. Please try again.</p><button className="pf-button" onClick={() => refetch()}>Retry</button></div> : filtered.length ? <InterviewCards interviews={filtered} /> : <p className="pf-status">{query ? 'No interviews match that search. Try another name or topic.' : 'The interview collection is temporarily unavailable.'}</p>}</>;
}
function InterviewPage() {
  const { slug } = useParams();
  const { data = [], isPending, isError, refetch } = useInterviews();
  const interview = data.find(i => i.slug.current === slug);
  if (isPending) return <p className="pf-status" role="status">Loading interview…</p>;
  if (isError) return <div className="pf-status" role="alert"><p>The interview couldn’t be loaded.</p><button className="pf-button" onClick={() => refetch()}>Retry</button></div>;
  if (!interview) return <Unavailable />;
  return <div className="pf-reading"><Metadata title={interview.title} description={interview.excerpt || 'A Humanities Last Chance interview by Dane Anderson.'} image={interview.mainImage?.asset?.url} /><Link className="pf-text-link" to="/interviews">← All interviews</Link><p className="pf-eyebrow">Humanities Last Chance</p><h1>{interview.title}</h1><p className="pf-byline">Interview by Dane Anderson{interview.publishedAt && ` · ${date(interview.publishedAt)}`}</p>{interview.excerpt && <p className="pf-interview-deck">{interview.excerpt}</p>}{interview.mainImage?.asset?.url && <figure className="pf-interview-image"><img src={interview.mainImage.asset.url} alt={interview.mainImage.alt || interview.title} />{interview.mainImage.caption && <figcaption>{interview.mainImage.caption}</figcaption>}</figure>}<article className="pf-transcript prose max-w-none">{typeof interview.body === 'string' ? <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(interview.body) }} /> : interview.body && <PortableText value={interview.body} />}</article><div className="pf-reading-end"><Link className="pf-text-link" to="/interviews">← Return to the interview series</Link></div></div>;
}
function Courses() {
  const [query, setQuery] = useState('');
  const matches = disciplines.map(d => ({ ...d, courses: d.courses.filter(c => `${d.name} ${c.title} ${c.instructor}`.toLowerCase().includes(query.toLowerCase())) })).filter(d => d.courses.length);
  return <><Metadata title="Favorite Courses" description="Dane Anderson’s collection of free lecture courses in literature, philosophy, history, religion, and other disciplines." /><Intro eyebrow="For the curious" title="My favorite free courses"><p>A collection of lectures and courses for learning at your own pace. Browse by subject, or search for a teacher or topic. Many entries include course sites and reading lists.</p></Intro><div className="pf-collection-bar"><span>Lectures, courses & reading lists</span><label className="pf-search"><span className="sr-only">Search courses</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses or instructors" /></label></div><div className="pf-course-list">{matches.map(d => <details key={`${d.id}-${Boolean(query)}`} open={query ? true : undefined}><summary><h2>{d.name}</h2><span>{d.courses.length} courses <span aria-hidden="true">+</span></span></summary><div>{d.courses.map(c => <article className="pf-course" key={c.id}><h3><a href={c.link} target="_blank" rel="noopener noreferrer">{c.title} <span aria-hidden="true">↗</span></a></h3><p className="pf-course-instructor">{c.instructor}</p>{c.description && <p>{c.description}</p>}{c.alternateLinks?.length ? <div className="pf-course-links">{c.alternateLinks.map((l, i) => <a key={`${l.url}-${i}`} href={l.url} target="_blank" rel="noopener noreferrer">{l.platform} ↗</a>)}</div> : null}</article>)}</div></details>)}</div>{!matches.length && <p className="pf-status">No courses match that search.</p>}</>;
}
function Contact() {
  return <><Metadata title="Contact" description="Get in touch with Dane Anderson about research, teaching, or the Humanities Last Chance interview series." /><Intro eyebrow="Contact" title="Let’s talk."><p>For questions about my research, teaching, or interviews, you can reach me by email.</p></Intro><div className="pf-contact"><a href={`mailto:${email}`}>{email} <span aria-hidden="true">↗</span></a><p>Based in the Washington, D.C. area.</p></div></>;
}
function Unavailable() {
  return <><Metadata title="Page unavailable" description="This page is no longer available. Explore Dane Anderson’s research, interviews, and favorite courses." noindex /><Intro eyebrow="Page unavailable" title="This page is no longer here."><p>The blog and book reviews have been retired. You can still explore the complete interview series.</p></Intro><Link className="pf-button" to="/interviews">Browse the interviews <span aria-hidden="true">→</span></Link></>;
}
function LegacySearch() {
  const { search } = useLocation();
  return <Navigate to={`/interviews${search}`} replace />;
}
export default function Portfolio() {
  return <div className="portfolio"><a className="pf-skip" href="#main-content">Skip to content</a><Header /><main id="main-content" className="pf-main"><Routes><Route index element={<Home />} /><Route path="about" element={<About />} /><Route path="research" element={<Research />} /><Route path="interviews" element={<InterviewSeries />} /><Route path="articles/interviews" element={<Navigate to="/interviews" replace />} /><Route path="article/:slug" element={<InterviewPage />} /><Route path="courses" element={<Courses />} /><Route path="resources" element={<Navigate to="/courses" replace />} /><Route path="contact" element={<Contact />} /><Route path="search" element={<LegacySearch />} /><Route path="*" element={<Unavailable />} /></Routes></main><Footer /></div>;
}
