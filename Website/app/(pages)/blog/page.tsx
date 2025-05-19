"use client";

import { motion } from "framer-motion";
import {Header} from "../../../components/layout/header";
import {Footer} from "../../../components/layout/footer";
import BlogMain from "../../../components/blog/blog-main";
import ContactCTA from "../../../components/common/contactCta";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-24 pb-12 px-4 md:px-12 container mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-16">
            Insights, tips, and trends from our team of digital experts.
          </p>
        </motion.div>

        <BlogMain />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}