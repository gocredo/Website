"use client";

import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import Link from "next/link";

const staticBlogPosts = [
  {
    id: "web-design-trends-2025",
    title: "Top 5 Web Design Trends for 2025",
    content: "<h1>Top 5 Web Design Trends for 2025</h1><p>Explore the latest web design trends that will shape the digital landscape in 2025. This is a placeholder; add full content here.</p>",
    date: "May 10, 2025",
    image: "/images/blog1.jpg",
  },
  {
    id: "seo-rankings",
    title: "How to Boost Your SEO Rankings",
    content: "<h1>How to Boost Your SEO Rankings</h1><p>Learn proven SEO strategies to improve your website’s visibility. This is a placeholder; add full content here.</p>",
    date: "April 15, 2025",
    image: "/images/blog2.jpg",
  },
  {
    id: "future-mobile-apps",
    title: "The Future of Mobile Apps",
    content: "<h1>The Future of Mobile Apps</h1><p>Discover how mobile app development is evolving. This is a placeholder; add full content here.</p>",
    date: "March 20, 2025",
    image: "/images/blog3.jpg",
  },
];

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
}

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap params with React.use()
  const post = staticBlogPosts.find((p) => p.id === id);

  if (!post) {
    return <p className="text-red-400 text-center py-20">Post not found.</p>;
  }

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="relative h-96 w-full overflow-hidden rounded-t-lg">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
                onError={(e) => {
                  console.log(`Image failed to load: ${post.image}`);
                  e.currentTarget.src = "/images/placeholder.jpg";
                }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-4">{post.date}</p>
            <CardTitle className="text-3xl font-bold text-gray-100">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/blog" className="text-purple-400 hover:underline mb-6 inline-block">
              ← Back to Blog
            </Link>
            <div
              className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}