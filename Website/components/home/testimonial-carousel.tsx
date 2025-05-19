"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "goCredo transformed our digital presence completely. Their SEO strategies increased our organic traffic by 200% in just 6 months.",
    author: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechSolutions Inc.",
  },
  {
    quote:
      "The PPC campaigns managed by goCredo delivered a 320% ROI. Their data-driven approach and continuous optimization made all the difference.",
    author: "Michael Chen",
    position: "CEO",
    company: "Innovate Labs",
  },
  {
    quote:
      "Working with goCredo has been a game-changer for our business. Their social media strategies helped us build a loyal community around our brand.",
    author: "Emily Rodriguez",
    position: "Brand Manager",
    company: "Lifestyle Brands Co.",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-400 text-lg">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-30"></div>
          <div className="relative bg-gray-800/50 rounded-2xl p-8 md:p-12 border border-gray-700">
            <Quote className="h-12 w-12 text-purple-400/30 absolute top-8 left-8" />

            <div className="min-h-[200px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-xl md:text-2xl text-gray-200 italic mb-8 relative z-10">
                    "{testimonials[current].quote}"
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-purple-400">
                        {testimonials[current].author.charAt(0)}
                      </span>
                    </div>
                    <div className="text-lg font-semibold">{testimonials[current].author}</div>
                    <div className="text-gray-400">
                      {testimonials[current].position}, {testimonials[current].company}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index)
                    setAutoplay(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === index ? "bg-purple-500 w-6" : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-6">
              <button
                onClick={() => {
                  prev()
                  setAutoplay(false)
                }}
                className="bg-gray-800 border border-gray-700 rounded-full p-2 text-gray-400 hover:text-white hover:border-purple-500 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-6">
              <button
                onClick={() => {
                  next()
                  setAutoplay(false)
                }}
                className="bg-gray-800 border border-gray-700 rounded-full p-2 text-gray-400 hover:text-white hover:border-purple-500 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
