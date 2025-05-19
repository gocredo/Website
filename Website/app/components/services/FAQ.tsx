
import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "What is your typical process for a new project?",
      answer: "Our process typically involves discovery, strategy, design, development, testing, and launch phases. We start by understanding your business needs and goals, then develop a strategic plan, create designs, build the solution, thoroughly test it, and finally deploy it. We also provide ongoing support and maintenance after launch."
    },
    {
      question: "How long does it take to complete a website?",
      answer: "The timeline for website development varies based on the complexity of the project, but typically ranges from 4-12 weeks. Simple websites might take 4-6 weeks, while more complex sites with custom functionality could take 8-12 weeks or more. We'll provide a specific timeline during our initial consultation based on your project requirements."
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing is project-based and depends on the scope, complexity, and timeline of your specific needs. We provide detailed quotes after understanding your requirements during the initial consultation. We believe in transparent pricing with no hidden fees."
    },
    {
      question: "Do you offer maintenance and support after the project is complete?",
      answer: "Yes, we offer ongoing maintenance and support services to ensure your digital assets continue to perform optimally. We have various maintenance packages available that include regular updates, security monitoring, performance optimization, and content updates."
    },
    {
      question: "Can you help with content creation for my website?",
      answer: "Absolutely! We offer content creation services including copywriting, photography, videography, and graphic design. Our content strategy team can help develop compelling content that engages your audience and aligns with your brand voice."
    },
    {
      question: "Do you develop mobile apps for both iOS and Android?",
      answer: "Yes, we develop mobile applications for both iOS and Android platforms. We can create native apps specifically for each platform, or cross-platform apps using frameworks like React Native or Flutter that work on both platforms from a single codebase."
    },
    {
      question: "How do you ensure the security of websites and applications?",
      answer: "Security is a top priority for us. We implement industry best practices including secure coding standards, regular security updates, SSL certificates, data encryption, secure authentication systems, and vulnerability testing. We also provide security audits and ongoing monitoring for existing systems."
    },
    {
      question: "Do you provide SEO services?",
      answer: "Yes, we offer comprehensive SEO services to improve your online visibility. This includes keyword research, on-page optimization, technical SEO, content strategy, link building, and regular performance reporting. We also build all websites with SEO best practices in mind from the ground up."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Frequently Asked <span className="clip-text">Questions</span>
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Find answers to commonly asked questions about our services and processes.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="dark-card">
                <button
                  className="flex justify-between items-center w-full text-left p-6"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all ${openIndex === index ? 'max-h-96 pb-6 px-6' : 'max-h-0'}`}>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Still have questions? We're here to help!
            </p>
            <a href="/contact" className="button-gold inline-block">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
