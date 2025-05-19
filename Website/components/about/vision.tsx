"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Globe, Sparkles, Target } from "lucide-react";

const visionPoints = [
  {
    icon: <Target className="h-10 w-10 text-purple-400" />,
    title: "Our Mission",
    description:
      "To empower businesses with creative digital solutions that drive measurable growth and success.",
  },
  {
    icon: <Globe className="h-10 w-10 text-purple-400" />,
    title: "Our Vision",
    description:
      "To be the leading creative studio, transforming the digital landscape with innovative designs.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-purple-400" />,
    title: "Our Values",
    description:
      "Creativity, integrity, and collaboration are at the heart of everything we do.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Vision() {
  return (
    <section className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 mb-4">
            Our Purpose
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision & Mission</h2>
          <p className="text-gray-400 text-lg">
            We are driven by a passion to create impactful digital experiences that inspire and grow businesses.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {visionPoints.map((point, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="mb-4">{point.icon}</div>
                  <CardTitle className="text-xl font-bold">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-base">{point.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}