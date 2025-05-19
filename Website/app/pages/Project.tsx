
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WhatWeDid from '../components/project/WhatWeDid';
import Achievements from '../components/project/Achievements';
import ContactForm from '../components/home/ContactForm';

const Project = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main>
        <div className="pt-24 pb-12 px-6 md:px-12 container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Our <span className="clip-text">Projects</span>
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
            Explore our portfolio of successful projects that have delivered exceptional results for our clients.
          </p>
        </div>
        
        <WhatWeDid />
        <Achievements />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Project;
