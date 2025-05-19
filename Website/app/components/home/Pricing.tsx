
import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PricingPlan: React.FC<PricingPlanProps> = ({ name, price, description, features, popular }) => {
  return (
    <div className={`dark-card relative ${popular ? 'border-gold' : 'border-dark-light'}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-black text-xs font-semibold py-1 px-4 rounded-full">
          MOST POPULAR
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">{price}</span>
          {price !== 'Custom' && <span className="text-gray-400">/mo</span>}
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-gold mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        className={`block text-center py-2 px-6 rounded-md transition-colors w-full ${
          popular
            ? 'bg-gold text-black hover:bg-gold-light'
            : 'border border-gray-600 text-white hover:border-gold hover:text-gold'
        }`}
      >
        Get Started
      </Link>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$2,999",
      description: "Perfect for startups",
      features: [
        "Custom Website Design",
        "Responsive Development",
        "CMS Integration",
        "SEO Optimization",
        "1 Month Free Support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$4,999",
      description: "For growing businesses",
      features: [
        "Everything in Basic",
        "E-commerce Functionality",
        "Custom Animations",
        "Advanced SEO",
        "3 Months Free Support",
        "Performance Optimization"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Professional",
        "Custom Web Applications",
        "API Integrations",
        "Dedicated Project Manager",
        "12 Months Free Support",
        "Analytics Dashboard"
      ],
      popular: false
    }
  ];

  return (
    <section className="section-padding bg-dark-muted" id="pricing">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing to <span className="clip-text">Fit Your Needs</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your project needs. All plans include our award-winning design and development services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
