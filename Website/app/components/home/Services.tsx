
import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="dark-card flex flex-col items-center transition-transform hover:-translate-y-1 duration-300">
      <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mb-5">
        <span className="text-gold text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: "✦",
      title: "UX/UI Design",
      description: "Beautiful, intuitive interfaces that delight users and achieve your business goals."
    },
    {
      icon: "✧",
      title: "Web Development",
      description: "Responsive, high-performance websites and web applications built with modern technologies."
    },
    {
      icon: "◈",
      title: "Branding & Identity",
      description: "Distinctive brand identities that communicate your values and resonate with your audience."
    },
    {
      icon: "◆",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that provide seamless user experiences."
    },
  ];

  return (
    <section className="section-padding bg-dark" id="services">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Services We Provide <span className="clip-text">For You</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive range of design and development services to help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
