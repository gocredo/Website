"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const reasons = [
  "Innovative designs tailored to your brand",
  "Proven track record of delivering results",
  "Dedicated team of creative professionals",
  "Transparent communication and collaboration",
  "Cutting-edge tools for optimal performance",
  "Flexible solutions for businesses of all sizes",
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20"></div>
            <div className="relative aspect-[4/3] w-full bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-gray-700 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-400">Creative Studio</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 mb-2">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Your Partner in Digital Success</h2>
            <p className="text-gray-400 text-lg">
              We combine creativity, strategy, and technology to deliver exceptional results for your business.
            </p>

            <div className="space-y-4 pt-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{reason}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}