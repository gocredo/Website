
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Vision = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="dark-card">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-400 mb-4">
              To become the most innovative and client-focused digital creative agency, 
              creating digital experiences that transform businesses and inspire audiences worldwide.
            </p>
            <p className="text-gray-400">
              We envision a world where every brand can effectively communicate its unique story and value 
              through exceptional digital experiences.
            </p>
          </div>
          
          <div className="dark-card">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-400 mb-4">
              To deliver creative solutions that elevate brands, drive business growth, and create 
              meaningful connections with audiences.
            </p>
            <p className="text-gray-400">
              We combine strategic thinking, cutting-edge design, and technical expertise to 
              create digital experiences that exceed client expectations and achieve measurable results.
            </p>
          </div>
          
          <div className="dark-card">
            <h3 className="text-2xl font-bold mb-4">Our Awards</h3>
            <ul className="text-gray-400 space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-gold mr-3"></span>
                Webby Awards Honoree 2023
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-gold mr-3"></span>
                Awwwards Site of the Day
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-gold mr-3"></span>
                CSS Design Awards Winner
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-gold mr-3"></span>
                FWA Site of the Month
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-gold mr-3"></span>
                Communication Arts Excellence
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <div className="w-full">
            <AspectRatio ratio={16/9} className="bg-dark-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Our team at work" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
