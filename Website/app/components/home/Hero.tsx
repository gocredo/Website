
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-dark overflow-hidden pt-24">
      <div className="absolute w-full h-full">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="overflow-hidden mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold animate-text-reveal delay-100">
              Bringing Your <span className="clip-text">Dream</span> Into 
              <span className="clip-text"> Reality</span>
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-text-reveal delay-300 max-w-2xl mx-auto">
              We are a design agency focused on creating beautiful, functional, and meaningful digital experiences that help brands stand out in today's crowded marketplace.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in opacity-0 delay-500">
            <Link 
              to="/contact" 
              className="button-gold px-8 py-3 flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/work" 
              className="px-8 py-3 border border-white/30 text-white rounded-md hover:bg-white/5 transition"
            >
              View Our Work
            </Link>
          </div>

          <div className="mt-16 md:mt-24 flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in-up opacity-0 delay-700">
            <img src="https://placehold.co/100x50/333333/FFFFFF/png?text=Client+1" alt="Client logo" className="h-8 opacity-70 hover:opacity-100 transition" />
            <img src="https://placehold.co/100x50/333333/FFFFFF/png?text=Client+2" alt="Client logo" className="h-8 opacity-70 hover:opacity-100 transition" />
            <img src="https://placehold.co/100x50/333333/FFFFFF/png?text=Client+3" alt="Client logo" className="h-8 opacity-70 hover:opacity-100 transition" />
            <img src="https://placehold.co/100x50/333333/FFFFFF/png?text=Client+4" alt="Client logo" className="h-8 opacity-70 hover:opacity-100 transition" />
            <img src="https://placehold.co/100x50/333333/FFFFFF/png?text=Client+5" alt="Client logo" className="h-8 opacity-70 hover:opacity-100 transition" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
