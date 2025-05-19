
import React from 'react';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
  return (
    <section className="section-padding bg-dark-muted relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your <span className="clip-text">Project</span>?
          </h2>
          <p className="text-gray-400 mb-8 text-lg max-w-3xl mx-auto">
            Let's collaborate to create something amazing together. Contact our team today
            to discuss your project requirements and how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="button-gold px-8 py-3 text-center">
              Contact Us
            </Link>
            <Link to="/services" className="px-8 py-3 border border-gray-600 rounded-md hover:border-gold transition text-center">
              Our Services
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-16 left-16 w-32 h-32 rounded-full bg-gold/5 blur-3xl"></div>
      <div className="absolute bottom-16 right-16 w-64 h-64 rounded-full bg-gold/5 blur-3xl"></div>
    </section>
  );
};

export default ContactCTA;
