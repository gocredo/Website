
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceBlocks = () => {
  const services = [
    {
      id: "web-design",
      title: "Web Design & Development",
      description: "We create beautiful, responsive websites that engage visitors and drive conversions. Our web solutions are tailored to your specific business needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-gold">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 9h.01" />
          <path d="M11 9h.01" />
          <path d="M7 13h.01" />
          <path d="M11 13h.01" />
          <path d="M7 17h.01" />
          <path d="M11 17h.01" />
          <rect width="2" height="2" x="15" y="9" />
          <rect width="2" height="2" x="15" y="13" />
          <rect width="2" height="2" x="15" y="17" />
        </svg>
      )
    },
    {
      id: "ux-ui-design",
      title: "UX/UI Design",
      description: "We create intuitive, engaging user experiences and interfaces that delight users and achieve business objectives through user-centered design principles.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-gold">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
      )
    },
    {
      id: "branding",
      title: "Branding & Identity",
      description: "We help businesses establish a strong, memorable brand identity through logo design, brand guidelines, and comprehensive visual identity systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-gold">
          <path d="m2 2 8 8" />
          <path d="m22 2-8 8" />
          <ellipse cx="12" cy="15" rx="5" ry="3" />
        </svg>
      )
    },
    {
      id: "mobile-app",
      title: "Mobile App Development",
      description: "We build native and cross-platform mobile applications that provide exceptional user experiences and help businesses engage with their mobile audiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-gold">
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <line x1="12" x2="12.01" y1="18" y2="18" />
        </svg>
      )
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "We develop comprehensive digital marketing strategies that help businesses reach their target audience, increase brand awareness, and drive conversions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-gold">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      )
    },
    {
      id: "ecommerce",
      title: "E-commerce Solutions",
      description: "We create robust e-commerce platforms that provide seamless shopping experiences, secure payment processing, and efficient inventory management.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-gold">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      )
    }
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link to={`/services/${service.id}`} key={index} className="dark-card group transition-all hover:shadow-lg hover:shadow-gold/10">
              <div className="p-8">
                <div className="mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>
                
                <div className="flex items-center text-gold">
                  <span className="mr-2">Learn more</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBlocks;
