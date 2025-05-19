"use client"

import { motion } from "framer-motion"
import { Search, BarChart, Share2, Globe, TrendingUp, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: <Search className="h-10 w-10 text-purple-400" />,
    title: "Search Engine Optimization",
    description:
      "Improve your website's visibility in search results and drive organic traffic with our data-driven SEO strategies.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-purple-400" />,
    title: "Pay-Per-Click Advertising",
    description:
      "Maximize your ROI with targeted PPC campaigns that deliver immediate results and measurable performance.",
  },
  {
    icon: <Share2 className="h-10 w-10 text-purple-400" />,
    title: "Social Media Marketing",
    description:
      "Build brand awareness and engage with your audience through strategic social media campaigns and content.",
  },
  {
    icon: <Globe className="h-10 w-10 text-purple-400" />,
    title: "Web Design & Development",
    description:
      "Create stunning, conversion-focused websites that provide exceptional user experiences and drive business growth.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-purple-400" />,
    title: "Content Marketing",
    description:
      "Develop high-quality content that resonates with your audience and establishes your brand as an industry authority.",
  },
  {
    icon: <Mail className="h-10 w-10 text-purple-400" />,
    title: "Email Marketing",
    description:
      "Nurture leads and retain customers with personalized email campaigns that drive engagement and conversions.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Digital Marketing Solutions</h2>
          <p className="text-gray-400 text-lg">
            We offer a full range of digital marketing services to help your business grow and succeed in the digital
            landscape.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
