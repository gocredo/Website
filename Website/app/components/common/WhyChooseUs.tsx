
import React from 'react';
import { Check, Users, Layout, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-dark-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Why Choose <span className="clip-text">Us</span>
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          We combine creativity, strategy, and technical expertise to deliver exceptional results for our clients.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="dark-card p-8">
            <div className="h-14 w-14 rounded-full bg-dark-light flex items-center justify-center mb-6 gold-border">
              <Check className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-4">Quality Guaranteed</h3>
            <p className="text-gray-400">
              We don't compromise on quality. Every project undergoes rigorous quality checks to ensure excellence.
            </p>
          </div>
          
          <div className="dark-card p-8">
            <div className="h-14 w-14 rounded-full bg-dark-light flex items-center justify-center mb-6 gold-border">
              <Users className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-4">Expert Team</h3>
            <p className="text-gray-400">
              Our team consists of industry experts with years of experience in design, development, and marketing.
            </p>
          </div>
          
          <div className="dark-card p-8">
            <div className="h-14 w-14 rounded-full bg-dark-light flex items-center justify-center mb-6 gold-border">
              <Layout className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-4">Tailored Solutions</h3>
            <p className="text-gray-400">
              We develop custom solutions tailored to your specific business needs and objectives.
            </p>
          </div>
          
          <div className="dark-card p-8">
            <div className="h-14 w-14 rounded-full bg-dark-light flex items-center justify-center mb-6 gold-border">
              <Clock className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-4">Timely Delivery</h3>
            <p className="text-gray-400">
              We respect deadlines and deliver projects on time without compromising on quality.
            </p>
          </div>
          
          <div className="dark-card p-8">
            <div className="h-14 w-14 rounded-full bg-dark-light flex items-center justify-center mb-6 gold-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gold">
                <path d="M12 2v4"></path>
                <path d="M12 18v4"></path>
                <path d="m4.93 4.93 2.83 2.83"></path>
                <path d="m16.24 16.24 2.83 2.83"></path>
                <path d="M2 12h4"></path>
                <path d="M18 12h4"></path>
                <path d="m4.93 19.07 2.83-2.83"></path>
                <path d="m16.24 7.76 2.83-2.83"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Innovative Approach</h3>
            <p className="text-gray-400">
              We stay ahead of industry trends and implement innovative solutions to give you a competitive edge.
            </p>
          </div>
          
          <div className="dark-card p-8">
            <div className="h-14 w-14 rounded-full bg-dark-light flex items-center justify-center mb-6 gold-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gold">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Result-Oriented</h3>
            <p className="text-gray-400">
              We focus on delivering tangible results that drive growth and help you achieve your business objectives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
