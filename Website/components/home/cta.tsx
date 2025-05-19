"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function Cta() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] mix-blend-overlay opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

          <div className="relative py-16 px-8 md:py-24 md:px-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto">
              Ready to Accelerate Your Business Growth?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Get in touch today and discover how our digital marketing expertise can help you achieve your business
              goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Link href="/#contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
