"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Brush, BarChart2, Smartphone } from "lucide-react";

const services = [
  {
    icon: <Brush className="h-10 w-10 text-purple-400" />,
    title: "Web Design",
    description:
      "Create stunning, user-friendly websites that captivate and convert your audience.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-purple-400" />,
    title: "Mobile Apps",
    description:
      "Develop intuitive mobile applications tailored to your business needs.",
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-purple-400" />,
    title: "Digital Marketing",
    description:
      "Boost your online presence with data-driven SEO and marketing strategies.",
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

export default function ServiceBlocks() {
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
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}