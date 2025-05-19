
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Analytics from '../components/about/Analytics';
import Vision from '../components/about/Vision';
import WhyChooseUs from '../components/common/WhyChooseUs';
import Process from '../components/common/Process';
import ContactCTA from '../components/common/ContactCTA';
import TeamSection from '../components/about/TeamSection';

const About = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main>
        <div className="pt-24 pb-12 px-6 md:px-12 container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            About <span className="clip-text">Creado</span>
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
            A creative design studio with a passion for crafting beautiful digital experiences that drive results.
          </p>
        </div>
        
        <Analytics />
        <Vision />
        <WhyChooseUs />
        <Process />
        <TeamSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
