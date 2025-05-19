
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const RecentPosts = () => {
  const recentPosts = [
    {
      id: 5,
      title: "How AI is Transforming the Design Industry",
      date: "May 15, 2023",
      image: "https://images.unsplash.com/photo-1550432163-9cb326104944?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "5 Ways to Improve Your Website's Performance",
      date: "May 8, 2023",
      image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "The Psychology of Color in Marketing",
      date: "May 1, 2023",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "Building Accessible Websites: A Complete Guide",
      date: "April 25, 2023",
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=200&h=200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="dark-card">
      <h3 className="text-xl font-bold mb-6">Recent Posts</h3>
      
      <div className="space-y-6">
        {recentPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-4 group">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h4 className="font-medium mb-2 group-hover:text-gold transition-colors line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
