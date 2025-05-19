
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCategories = () => {
  const categories = [
    { name: "Design", count: 12 },
    { name: "Development", count: 9 },
    { name: "Marketing", count: 7 },
    { name: "UX/UI", count: 5 },
    { name: "Technology", count: 8 },
    { name: "Business", count: 4 }
  ];

  return (
    <div className="dark-card">
      <h3 className="text-xl font-bold mb-6">Categories</h3>
      
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li key={index} className="border-b border-gray-700 last:border-b-0">
            <Link 
              to={`/blog/category/${category.name.toLowerCase()}`}
              className="flex justify-between items-center py-3 hover:text-gold transition-colors"
            >
              <span>{category.name}</span>
              <span className="bg-dark-light text-xs rounded-full px-2 py-1">
                {category.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
