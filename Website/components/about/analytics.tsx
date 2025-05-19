"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const analyticsStats = [
  { value: 300, label: "Projects Completed", suffix: "+" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
  { value: 50, label: "Team Members", suffix: "+" },
  { value: 15, label: "Awards Won", suffix: "+" },
];

export default function Analytics() {
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
            Our Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements in Numbers</h2>
          <p className="text-gray-400 text-lg">
            We measure our success by the impact we create for our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {analyticsStats.map((stat, index) => (
            <StatCounter
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type StatCounterProps = {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
};

function StatCounter({ value, label, suffix = "", delay = 0 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    if (inView) {
      const timer = setTimeout(() => {
        const counter = setInterval(() => {
          start += increment;
          if (start > value) {
            setCount(value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(counter);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-gray-400">{label}</p>
    </motion.div>
  );
}