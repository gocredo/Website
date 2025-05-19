
import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company: string;
  image?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, position, company, image }) => {
  return (
    <div className="dark-card">
      <div className="mb-6">
        <svg className="h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
      </div>
      <p className="text-gray-300 mb-6">{quote}</p>
      <div className="flex items-center">
        {image ? (
          <img src={image} alt={author} className="h-10 w-10 rounded-full mr-3" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gold/20 text-gold flex items-center justify-center mr-3">
            {author[0]}
          </div>
        )}
        <div>
          <h4 className="text-white font-semibold">{author}</h4>
          <p className="text-gray-400 text-sm">{position}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Working with Creado was a game-changer for our business. Their team delivered an exceptional website that perfectly captured our brand and increased our conversions by 40%.",
      author: "Sarah Johnson",
      position: "CEO",
      company: "StyleHub",
    },
    {
      quote: "The team at Creado truly understands design. They took our vague ideas and transformed them into a beautiful, functional app that our users love. Highly recommended!",
      author: "Michael Chen",
      position: "Product Manager",
      company: "TechSolutions",
    },
    {
      quote: "From start to finish, Creado was professional, creative, and attentive to our needs. Their branding work has helped us stand out in a crowded market.",
      author: "Emma Rodriguez",
      position: "Marketing Director",
      company: "GrowthMasters",
    },
  ];

  return (
    <section className="section-padding bg-dark" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our <span className="clip-text">Clients</span> Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              company={testimonial.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
