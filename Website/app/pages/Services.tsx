
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ServiceBlocks from '../components/services/ServiceBlocks';
import AppointmentForm from '../components/services/AppointmentForm';
import Process from '../components/common/Process';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/services/FAQ';

const Services = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main>
        <div className="pt-24 pb-12 px-6 md:px-12 container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Our <span className="clip-text">Services</span>
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
            We offer a comprehensive range of creative and technical services to help your business succeed in the digital world.
          </p>
        </div>
        
        <ServiceBlocks />
        <AppointmentForm />
        <Process />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
