
import React from 'react';
import { Link } from 'react-router-dom';

const BlogTags = () => {
  const tags = [
    "Design", "Development", "UX", "UI", "Branding", 
    "Marketing", "Technology", "Web Design", "Mobile", 
    "SEO", "E-commerce", "Accessibility", "Performance"
  ];

  return (
    <div className="dark-card">
      <h3 className="text-xl font-bold mb-6">Tags</h3>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Link 
            key={index}
            to={`/blog/tag/${tag.toLowerCase()}`}
            className="bg-dark-light px-3 py-1 text-sm rounded-full hover:bg-gold hover:text-black transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
