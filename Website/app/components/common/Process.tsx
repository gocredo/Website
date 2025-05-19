
import React from 'react';

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start by understanding your business, goals, target audience, and project requirements through in-depth consultations."
    },
    {
      number: "02",
      title: "Strategy",
      description: "Based on our findings, we develop a comprehensive strategy tailored to your specific needs and objectives."
    },
    {
      number: "03",
      title: "Design",
      description: "Our creative team designs visually stunning and user-friendly interfaces that align with your brand identity."
    },
    {
      number: "04",
      title: "Development",
      description: "Our developers bring the designs to life, creating robust and scalable digital solutions using cutting-edge technologies."
    },
    {
      number: "05",
      title: "Testing",
      description: "We conduct thorough testing to ensure functionality, usability, performance, and compatibility across different devices."
    },
    {
      number: "06",
      title: "Launch",
      description: "We handle the deployment process, ensuring a smooth and successful launch of your project."
    }
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Our <span className="clip-text">Process</span>
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          We follow a structured approach to deliver exceptional results and ensure a smooth collaboration experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="dark-card p-8 relative overflow-hidden group">
              <div className="absolute -top-2 -left-2 text-7xl font-bold text-dark-light opacity-20 group-hover:text-gold/20 transition-colors">
                {step.number}
              </div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
