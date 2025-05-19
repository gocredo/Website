
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BlogSubscribe = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this to your newsletter service
    console.log('Subscribing email:', email);
    
    // Show success message
    setSubmitted(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="dark-card">
      <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
      <p className="text-gray-400 mb-6">
        Stay updated with our latest news, articles, and insights.
      </p>
      
      {submitted ? (
        <div className="bg-green-900/20 text-green-400 p-4 rounded-md">
          Thank you for subscribing! You'll receive our updates soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-dark-light border-gray-700 focus:border-gold"
            />
            <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-black">
              Subscribe
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogSubscribe;
