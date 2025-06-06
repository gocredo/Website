"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BlogCard from "../../components/ui/blog-card";
import { Button } from "../../components/ui/button";

const blogPosts = [
  {
    id: "web-design-trends-2025",
    title: "Top 5 Web Design Trends for 2025",
    excerpt: "Explore the latest web design trends that will shape the digital landscape in 2025.",
    date: "May 10, 2025",
    image: "/images/placeholder.jpg",
    link: "/blog/web-design-trends-2025",
  },
  {
    id: "seo-rankings",
    title: "How to Boost Your SEO Rankings",
    excerpt: "Learn proven SEO strategies to improve your website’s visibility on search engines.",
    date: "April 15, 2025",
    image: "/images/placeholder.jpg",
    link: "/blog/seo-rankings",
  },
  {
    id: "future-mobile-apps",
    title: "The Future of Mobile Apps",
    excerpt: "Discover how mobile app development is evolving with new technologies and user expectations.",
    date: "March 20, 2025",
    image: "/images/placeholder.jpg",
    link: "/blog/future-mobile-apps",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface MediumPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image: string;
  mediumLink: string;
}

export default function BlogPostMain() {
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const latestMediumTitle = mediumPosts.length > 0 ? mediumPosts[0].title : " ";
  useEffect(() => {
    async function fetchMediumPosts() {
      try {
        setLoading(true);
        const response = await fetch("/api/medium-post");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const posts = await response.json();
        if (posts.error) throw new Error(posts.error);
        setMediumPosts(posts);
      } catch (error) {
        console.error("Error fetching Medium posts:", error);
        setError("Failed to load Medium posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchMediumPosts();
  }, []);

  return (
    <section className="py-20 bg-gray-900/50 border-y border-gray-800">
      <div className="container mx-auto px-4">
        {/* Static Blog Posts */}
        <motion.div variants={container} initial="hidden" whileInView="show" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <BlogCard {...post} />
            </motion.div>
          ))}
        </motion.div>

        {/* Medium Posts */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Read Our Latest{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {latestMediumTitle}
            </span>
          </h2>

          <Button asChild className="mb-8 bg-purple-600 hover:bg-purple-700">
            <a href="https://medium.com/@gocredo.team" target="_blank" rel="noopener noreferrer">
              Read More on Medium →
            </a>
          </Button>

          {loading ? (
            <p className="text-gray-400">Loading Medium posts...</p>
          ) : error && mediumPosts.length === 0 ? (
            <p className="text-gray-400 mb-4">{error}</p>
          ) : mediumPosts.length === 0 ? (
            <p className="text-gray-400">No Medium posts available.</p>
          ) : (
            <motion.div variants={container} initial="hidden" whileInView="show" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mediumPosts.map((post) => (
                <motion.div key={post.id} variants={item}>
                  <BlogCard
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    image={post.image}
                    link={`/blog/medium/${post.id}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
