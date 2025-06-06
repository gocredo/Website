"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";
import { Header } from "../../../../../components/layout/header";
import { Footer } from "../../../../../components/layout/footer";
import ContactCTA from "../../../../../components/common/contactCta";

interface MediumPost {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
}

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap params with React.use()
  const [post, setPost] = useState<MediumPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        console.log(`Fetching Medium post with ID: ${id}`);
        const response = await fetch(`/api/medium-post/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setPost(data);
      } catch (error: any) {
        console.error("Error fetching Medium post:", error.message);
        setError(error.message === "Post not found" ? "This Medium post could not be found." : "Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-12 px-4 md:px-12 container mx-auto text-center"
          >
            <p className="text-gray-400 text-lg">Loading Medium post...</p>
          </motion.div>
        ) : error || !post ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-12 px-4 md:px-12 container mx-auto text-center"
          >
            <p className="text-red-400 text-lg">{error || "Post not found."}</p>
            
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-24 pb-12 px-4 md:px-12 container mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-16">
                {post.date} | Insights from our team
              </p>
            </motion.div>
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
            <div className="w-full flex justify-center my-8">
            <Link
                href="/blog"
                className="text-purple-400 hover:text-purple-300 font-medium text-lg transition-all duration-200"
            >
                ← Back to Blog
            </Link>
            </div>

            <ContactCTA />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}