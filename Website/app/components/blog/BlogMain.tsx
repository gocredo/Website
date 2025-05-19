
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import RecentPosts from './RecentPosts';
import BlogCategories from './BlogCategories';
import BlogTags from './BlogTags';
import BlogSubscribe from './BlogSubscribe';

const BlogMain = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 UX Design Principles to Improve User Engagement",
      excerpt: "Learn the key UX design principles that can significantly improve user engagement and conversion rates on your website or application.",
      image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=800&auto=format&fit=crop",
      date: "May 10, 2023",
      author: "Samantha Lee",
      category: "UX Design"
    },
    {
      id: 2,
      title: "The Future of Web Development: Trends to Watch in 2023",
      excerpt: "Explore the emerging web development trends that are shaping the future of digital experiences and how you can stay ahead of the curve.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
      date: "April 28, 2023",
      author: "Michael Chen",
      category: "Development"
    },
    {
      id: 3,
      title: "How to Create a Successful Digital Marketing Strategy",
      excerpt: "A comprehensive guide to creating an effective digital marketing strategy that drives traffic, engages customers, and boosts conversions.",
      image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=800&auto=format&fit=crop",
      date: "April 15, 2023",
      author: "David Wilson",
      category: "Marketing"
    },
    {
      id: 4,
      title: "The Importance of Responsive Design in 2023",
      excerpt: "Why responsive design remains critical in today's multi-device world and how to ensure your website provides an optimal experience across all devices.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      date: "March 30, 2023",
      author: "Emily Martinez",
      category: "Design"
    }
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-12">
              {blogPosts.map((post) => (
                <article key={post.id} className="dark-card overflow-hidden">
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 text-sm font-medium rounded">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>By {post.author}</span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold mb-4 hover:text-gold transition-colors">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    
                    <p className="text-gray-400 mb-6">
                      {post.excerpt}
                    </p>
                    
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="outline" className="hover:text-gold hover:border-gold transition-colors">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="px-8 hover:text-gold hover:border-gold transition-colors">
                Load More
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="space-y-10">
              <RecentPosts />
              <BlogCategories />
              <BlogTags />
              <BlogSubscribe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogMain;
