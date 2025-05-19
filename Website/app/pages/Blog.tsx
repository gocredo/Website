
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BlogMain from '../components/blog/BlogMain';
import ContactCTA from '../components/common/ContactCTA';

const Blog = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main>
        <div className="pt-24 pb-12 px-6 md:px-12 container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Our <span className="clip-text">Blog</span>
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
            Insights, tips, and trends from our team of digital experts.
          </p>
        </div>
        
        <BlogMain />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
