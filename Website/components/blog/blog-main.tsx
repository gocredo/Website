"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Web Design Trends for 2025",
    excerpt:
      "Explore the latest web design trends that will shape the digital landscape in 2025.",
    date: "May 10, 2025",
    slug: "/blog/web-design-trends-2025",
    image: "/images/blog1.jpg", // Placeholder; add actual image in public/
  },
  {
    id: 2,
    title: "How to Boost Your SEO Rankings",
    excerpt:
      "Learn proven SEO strategies to improve your website’s visibility on search engines.",
    date: "April 15, 2025",
    slug: "/blog/seo-rankings",
    image: "/images/blog2.jpg",
  },
  {
    id: 3,
    title: "The Future of Mobile Apps",
    excerpt:
      "Discover how mobile app development is evolving with new technologies and user expectations.",
    date: "March 20, 2025",
    slug: "/blog/future-mobile-apps",
    image: "/images/blog3.jpg",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogMain() {
  return (
    <section className="py-20 bg-gray-900/50 border-y border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full"
                      onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")} // Fallback image
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-2">{post.date}</p>
                  <CardTitle className="text-xl font-bold mb-2">
                    <Link href={post.slug} className="hover:text-purple-400 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <p className="text-gray-400">{post.excerpt}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}