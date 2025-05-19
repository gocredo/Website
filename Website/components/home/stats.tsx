"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

const stats = [
  { value: 500, label: "Clients Worldwide", suffix: "+" },
  { value: 94, label: "Client Retention Rate", suffix: "%" },
  { value: 10, label: "Years of Experience", suffix: "+" },
  { value: 250, label: "Marketing Campaigns", suffix: "M+" },
]

export function Stats() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Driving Growth Through Digital Excellence</h2>
          <p className="text-gray-400 text-lg">
            We've helped hundreds of businesses achieve their marketing goals and grow their online presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCounter key={index} value={stat.value} label={stat.label} suffix={stat.suffix} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCounter({ value, label, suffix = "", delay = 0 }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)

    if (inView) {
      const timer = setTimeout(() => {
        const counter = setInterval(() => {
          start += increment
          if (start > value) {
            setCount(value)
            clearInterval(counter)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)

        return () => clearInterval(counter)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [inView, value, delay])

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
  )
}
