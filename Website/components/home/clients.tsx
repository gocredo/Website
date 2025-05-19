"use client"

import { motion } from "framer-motion"
import { useRef, useEffect } from "react"

export function Clients() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = containerRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth
    const clientWidth = scrollContainer.clientWidth

    if (scrollWidth <= clientWidth) return

    let scrollPos = 0
    const maxScroll = scrollWidth - clientWidth
    const speed = 0.5

    const scroll = () => {
      scrollPos += speed
      if (scrollPos >= maxScroll) {
        scrollPos = 0
      }
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPos
      }
      requestAnimationFrame(scroll)
    }

    const animation = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animation)
  }, [])

  return (
    <section className="py-12 bg-gray-900/50 border-y border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-lg font-medium text-gray-400">Trusted by innovative companies worldwide</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

          <div ref={containerRef} className="flex overflow-x-hidden space-x-12 py-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 h-12 w-32 bg-gray-800 rounded-md flex items-center justify-center">
                <div className="text-xl font-bold text-gray-500 opacity-70">Client {i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
