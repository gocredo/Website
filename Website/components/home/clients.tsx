"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Clients({ data = [] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultTools = [
    { name: "Google Ads", logo: "/logos/google-ads.png" },
    { name: "Meta Business", logo: "/logos/meta.png" },
    { name: "HubSpot", logo: "/logos/hubspot.png" },
    { name: "SEMRush", logo: "/logos/semrush.png" },
    { name: "Mailchimp", logo: "/logos/mailchimp.png" },
  ];

  const tools = data.length > 0 ? data : defaultTools;
  const duplicatedTools = [...tools, ...tools]; 

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    const speed = 0.5;

    const scroll = () => {
      if (!container) return;
      container.scrollLeft += speed;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-12 bg-gray-900/50 border-y border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-lg font-medium text-gray-400">Trusted Tools & Partners</h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10" />

          <div
            ref={containerRef}
            className="flex whitespace-nowrap overflow-hidden space-x-12 py-4"
          >
            {duplicatedTools.map((tool, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-16 w-36 bg-gray-800 rounded-md flex items-center justify-center p-2"
              >
                {tool.logo ? (
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="max-h-10 max-w-[120px] object-contain"
                  />
                ) : (
                  <div className="text-xl font-bold text-gray-500 opacity-70">
                    {tool.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
