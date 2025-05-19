"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart2, TrendingUp, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 mb-4">
              #1 Digital Marketing Agency
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Grow Your Business With Data-Driven Marketing
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              We help ambitious businesses like yours generate more profits by building awareness, driving web traffic,
              connecting with customers, and growing overall sales.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Link href="/#contact">
                  Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500 text-white hover:bg-purple-500/20"
              >
                <Link href="/#services">Our Services</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-gray-300">Increase Traffic</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-gray-300">Boost Conversions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-gray-300">Retain Customers</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-800 to-gray-900 p-6 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(128,90,213,0.2),transparent_80%)]"></div>
                <div className="relative z-10 h-full flex flex-col justify-center items-center">
                  <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="h-8 w-3/4 bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-700 rounded-full w-full animate-pulse"></div>
                      <div className="h-3 bg-gray-700 rounded-full w-5/6 animate-pulse"></div>
                      <div className="h-3 bg-gray-700 rounded-full w-4/6 animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="h-24 bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-10 w-1/2 bg-purple-500/30 rounded-lg mx-auto animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
