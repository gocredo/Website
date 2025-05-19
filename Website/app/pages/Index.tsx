
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Portfolio from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import Pricing from '../components/home/Pricing';
import ContactForm from '../components/home/ContactForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
