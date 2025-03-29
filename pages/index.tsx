
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Humanities Last Chance</title>
        <meta name="description" content="Connect with academic humanities scholarship through our platform" />
        <link rel="canonical" href="https://humanitieslastchance.org/" />
      </Head>

      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold mb-8">Humanities Last Chance</h1>
          <p className="mb-4">Welcome to our platform. This is the new Next.js version.</p>
          <Link href="/articles" className="text-primary hover:underline">
            Browse Articles
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
