"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const processSteps = [
  {
    title: "Discovery",
    description:
      "We dive deep into your business goals, target audience, and market to create a tailored strategy.",
  },
  {
    title: "Design",
    description:
      "Our team crafts stunning, user-focused designs that align with your brand identity.",
  },
  {
    title: "Development",
    description:
      "We build robust, scalable solutions using the latest technologies to ensure performance.",
  },
  {
    title: "Launch",
    description:
      "We deploy your project with rigorous testing to ensure a seamless launch.",
  },
  {
    title: "Optimization",
    description:
      "We continuously monitor and optimize to maximize results and ROI.",
  },
];

export default function Process() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % processSteps.length);
  };

  const prev = () => {
    setCurrent((current - 1 + processSteps.length) % processSteps.length);
  };

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
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
          <p className="text-gray-400 text-lg">
            Our streamlined process ensures your project is delivered on time, on budget, and with exceptional quality.
          </p>
        </motion.div>

    
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-30"></div>
          <Card className="bg-gray-800/50 border-gray-700 p-8">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {processSteps[current].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  {processSteps[current].description}
                </p>
              </CardContent>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {processSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === index ? "bg-purple-500 w-6" : "bg-gray-600"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-6">
              <button
                onClick={prev}
                className="bg-gray-800 border border-gray-700 rounded-full p-2 text-gray-400 hover:text-white hover:border-purple-500 transition-all"
                aria-label="Previous step"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-6">
              <button
                onClick={next}
                className="bg-gray-800 border border-gray-700 rounded-full p-2 text-gray-400 hover:text-white hover:border-purple-500 transition-all"
                aria-label="Next step"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}