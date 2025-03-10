
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SubscribeForm from '@/components/SubscribeForm';

const About = () => {
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-16">
        <Hero
          title="About Humanities Last Chance"
          size="medium"
        />
        
        <section className="py-12">
          <div className="article-container prose-custom">
            <p className="lead text-xl text-muted-foreground">
              Humanities Last Chance is dedicated to exploring, celebrating, and critically examining 
              humanities scholarship in all its forms. Through our daily publications, we aim to bridge 
              the gap between academic research and the wider public.
            </p>
            
            <h2 className="font-serif text-2xl font-medium mt-10 mb-4">Our Mission</h2>
            <p>
              In an era increasingly dominated by technological and scientific discourse, we believe 
              that the humanities—history, philosophy, literature, cultural studies, and related 
              disciplines—remain essential to understanding ourselves and our world. Humanities 
              scholarship offers unique insights into human experience, culture, ethics, and meaning 
              that complement and contextualize scientific knowledge.
            </p>
            <p>
              Our mission is to showcase the vitality and relevance of humanities research to contemporary 
              challenges. We believe that academic work in these fields deserves wider attention and 
              engagement. Through accessible writing, thoughtful curation, and critical dialogue, we aim 
              to demonstrate why the humanities matter now more than ever.
            </p>
            
            <h2 className="font-serif text-2xl font-medium mt-10 mb-4">What We Publish</h2>
            <p>
              Our content falls into three main categories:
            </p>
            <ul>
              <li>
                <strong>Blog Posts</strong>: Original essays exploring current research, emerging trends, 
                and theoretical debates in the humanities. Our contributors include established scholars, 
                early-career researchers, and independent thinkers.
              </li>
              <li>
                <strong>Interviews</strong>: In-depth conversations with leading figures in humanities 
                scholarship, exploring their work, methods, and insights. We aim to capture the thinking 
                behind influential books and research projects.
              </li>
              <li>
                <strong>Reviews</strong>: Thoughtful evaluations of recent books, exhibitions, digital 
                projects, and other cultural productions relevant to humanities scholarship. Our reviews 
                go beyond simple assessments to engage deeply with the ideas and arguments presented.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl font-medium mt-10 mb-4">Our Team</h2>
            <p>
              Humanities Last Chance was founded in 2022 by a team of scholars, writers, and editors 
              committed to humanities education and public engagement. Our editorial board includes 
              specialists in various humanities disciplines, ensuring that we maintain intellectual 
              rigor while remaining accessible to non-specialist readers.
            </p>
            <p>
              We collaborate with a diverse network of contributors from universities, research 
              institutions, museums, libraries, and independent organizations around the world. We 
              are committed to featuring voices and perspectives that reflect the diversity of 
              humanities scholarship globally.
            </p>
            
            <h2 className="font-serif text-2xl font-medium mt-10 mb-4">Our Values</h2>
            <p>
              Humanities Last Chance is guided by the following values:
            </p>
            <ul>
              <li>
                <strong>Intellectual openness</strong>: We engage with diverse theoretical approaches 
                and methodologies, avoiding ideological rigidity while maintaining critical standards.
              </li>
              <li>
                <strong>Accessibility</strong>: We believe scholarly ideas can and should be communicated 
                clearly without sacrificing complexity.
              </li>
              <li>
                <strong>Interdisciplinarity</strong>: We recognize that the most interesting work often 
                happens at the intersections between traditional disciplines.
              </li>
              <li>
                <strong>Relevance</strong>: We emphasize connections between humanities scholarship and 
                contemporary social, political, and cultural questions.
              </li>
              <li>
                <strong>Inclusivity</strong>: We are committed to featuring diverse voices and perspectives 
                in our content and organization.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl font-medium mt-10 mb-4">Contact Us</h2>
            <p>
              We welcome submissions, suggestions, and feedback from our readers. If you'd like to 
              contribute to Humanities Last Chance or have questions about our work, please visit our 
              <a href="/contact"> Contact page</a>.
            </p>
          </div>
        </section>
        
        <section className="py-12 bg-secondary/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SubscribeForm variant="minimal" />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
