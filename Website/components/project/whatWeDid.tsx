"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Developed a scalable e-commerce solution with advanced analytics, increasing client sales by 40%.",
    image: "/images/ecommerce.jpg", // Placeholder; add actual image in public/
  },
  {
    title: "Mobile App Redesign",
    description:
      "Revamped a mobile app UI/UX, improving user retention by 25% and enhancing brand visibility.",
    image: "/images/mobile-app.jpg",
  },
  {
    title: "SEO Campaign",
    description:
      "Executed a data-driven SEO strategy, boosting organic traffic by 60% in six months.",
    image: "/images/seo.jpg",
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

export default function WhatWeDid() {
  return (
    <section className="py-20 bg-gray-900/50 border-y border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 mb-4">
            Our Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We’ve Done</h2>
          <p className="text-gray-400 text-lg">
            A showcase of our impactful projects that have transformed businesses.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                      onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")} // Fallback image
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-bold mb-2">{project.title}</CardTitle>
                  <p className="text-gray-400">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}