
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PortfolioItemProps {
  image: string;
  title: string;
  category: string;
  link: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ image, title, category, link }) => {
  return (
    <Link to={link} className="group relative overflow-hidden rounded-lg block">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <div>
          <p className="text-gold text-sm mb-1">{category}</p>
          <h3 className="text-white text-xl font-semibold group-hover:underline">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

const Portfolio = () => {
  const portfolioItems = [
    {
      image: "https://placehold.co/600x450/1e1e1e/cccccc",
      title: "Elegant E-commerce Redesign",
      category: "UX/UI Design",
      link: "/work/ecommerce-redesign"
    },
    {
      image: "https://placehold.co/600x450/1e1e1e/cccccc",
      title: "Financial Dashboard App",
      category: "Web Development",
      link: "/work/financial-dashboard"
    },
    {
      image: "https://placehold.co/600x450/1e1e1e/cccccc",
      title: "Luxury Brand Identity",
      category: "Branding",
      link: "/work/luxury-brand"
    },
  ];

  return (
    <section className="section-padding bg-dark-muted" id="portfolio">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Awesome <span className="clip-text">Portfolio</span></h2>
            <p className="text-gray-400 max-w-xl">
              Explore our latest projects and see how we've helped our clients achieve their goals.
            </p>
          </div>
          <Link 
            to="/work" 
            className="mt-6 md:mt-0 flex items-center text-gold hover:text-gold-light transition-colors"
          >
            View All Work
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              image={item.image}
              title={item.title}
              category={item.category}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
