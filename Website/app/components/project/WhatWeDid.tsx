
import React from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';

const WhatWeDid = () => {
  const projects = [
    {
      title: "Eco-Friendly E-commerce Platform",
      client: "GreenEarth Products",
      services: ["Web Development", "UX/UI Design", "E-commerce"],
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop",
      description: "We designed and developed a custom e-commerce platform for GreenEarth Products, focusing on sustainability and a seamless shopping experience.",
      link: "#"
    },
    {
      title: "Financial Services App",
      client: "TrustBank",
      services: ["Mobile App", "UX/UI Design", "Fintech"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
      description: "A comprehensive banking app that allows users to manage their finances, make payments, and track investments with a focus on security and ease of use.",
      link: "#"
    },
    {
      title: "Healthcare Provider Website",
      client: "MediCare Plus",
      services: ["Web Development", "Content Strategy", "SEO"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      description: "A patient-focused website redesign that improved accessibility, appointment booking, and provided valuable health resources to the community.",
      link: "#"
    },
    {
      title: "Restaurant Ordering System",
      client: "Fusion Bistro",
      services: ["Web Application", "Mobile App", "Integration"],
      image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=800&auto=format&fit=crop",
      description: "A comprehensive online ordering system that integrated with the restaurant's POS system, allowing for seamless order management and delivery tracking.",
      link: "#"
    }
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          What We <span className="clip-text">Did</span>
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Explore our recent projects and the solutions we've created for our clients.
        </p>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="rounded-lg overflow-hidden">
                  
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                 
                </div>
              </div>
              
              <div className={`lg:col-span-5 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="text-gold h-5 w-5" />
                    <span className="text-gold">{project.client}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, idx) => (
                      <span key={idx} className="text-xs bg-dark-light px-3 py-1 rounded-full text-gray-300">
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-400">
                    {project.description}
                  </p>
                  
                  <a href={project.link} className="flex items-center gap-2 text-gold hover:underline">
                    View Project <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDid;
