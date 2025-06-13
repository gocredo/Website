"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { HelpCircle, Clock, CheckCircle, DollarSign, MapPin, Bot, Palette, BarChart } from "lucide-react";
import { Button } from "../../components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const iconVariants = {
  hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
};

const faqs = [
  {
    question: "What types of services do you offer?",
    answer:
      "Our Jaipur-based agency provides web design, mobile app development, digital marketing, branding, and AI-powered solutions like chatbots and advertising to drive your business growth across India.",
    icon: <HelpCircle className="h-[24px] w-[24px] text-purple-400 flex-shrink-0" strokeWidth={1.5} />,
  },
  {
    question: "How long does a project take?",
    answer:
      "Project timelines vary based on complexity. Most web and marketing projects take 4-12 weeks, while branding or custom app development may take longer. We provide a detailed timeline during consultation.",
    icon: <Clock className="h-[24px] w-[24px] text-purple-400 flex-shrink-0" strokeWidth={1.5} />,
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes, we offer flexible maintenance and support packages to ensure your website, app, or marketing campaigns run smoothly, with priority support for our clients across India.",
    icon: <CheckCircle className="h-[24px] w-[24px] text-purple-400 flex-shrink-0" strokeWidth={1.5} />,
  },
  {
    question: "How much do your services cost?",
    answer:
      "Pricing depends on the scope and package selected. Our plans range from budget-friendly options for startups to comprehensive solutions for enterprises. Contact us for a custom quote tailored to your needs.",
    icon: <DollarSign className="h-[24px] w-[24px] text-purple-400 flex-shrink-0" strokeWidth={1.5} />,
  },
  {
    question: "How does your Jaipur-based team benefit my business?",
    answer:
      "Our Jaipur-based team combines local market insights with global expertise, delivering cost-effective, high-quality solutions tailored to Indian businesses, from startups to established brands.",
    icon: <MapPin className="h-[24px] w-[24px] text-purple-400 flex-shrink-0" strokeWidth={1.5} />,
  },
  {
    question: "Can you integrate AI solutions like chatbots?",
    answer:
      "Absolutely! We specialize in AI-powered tools, including chatbot integration for customer support and AI-driven advertising to optimize your marketing campaigns, enhancing user engagement and ROI.",
    icon: <Bot className="h-[24px] w-[24px] text-purple-400 flex-shrink-0" strokeWidth={1.5} />,
  },
  {
    question: "Do you provide custom branding services?",
    answer:
      "Yes, our branding packages include logo design, brand style guides, and social media assets to create a cohesive identity that resonates with your audience, crafted by our creative Jaipur team.",
    icon: <Palette className="h-[24px] w-[24px] text-purple-400 flex-shrink-0" strokeWidth={1.5} />,
  },
  {
    question: "How can your digital marketing improve my SEO?",
    answer:
      "Our SEO strategies, including on-page optimization, local SEO, and video SEO, boost your search rankings, drive organic traffic, and increase visibility, tailored to your business goals.",
    icon: <BarChart className="h-[24px] w-[24px] text-purple-400 flex-shrink-0" strokeWidth={1.5} />,
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-900 overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-[100%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-12"
        >
          <div className="inline-block rounded-full bg-purple-500/20 px-3 py-1 text-xs sm:text-sm font-medium text-purple-400 mb-2 sm:mb-3 shadow-md shadow-purple-500/20">
            Common Questions
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 break-words">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-[90%] mx-auto">
            Explore answers to common queries about our Jaipur-based digital solutions, driving growth across India.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-3">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={item}>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-gradient-to-r from-gray-800 to-gray-900 border rounded-lg shadow-sm hover:shadow-purple-500/20 transition-shadow duration-300"
                >
                  <AccordionTrigger
                    className="flex items-center space-x-2 sm:space-x-3 text-left text-white hover:text-purple-400 py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base md:text-lg font-semibold focus-visible:ring-2 focus-visible:ring-purple-500"
                    aria-label={faq.question}
                  >
                    <motion.div variants={iconVariants} whileHover="hover">
                      {faq.icon}
                    </motion.div>
                    <span className="flex-grow truncate">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 text-xs sm:text-sm md:text-base pb-3 sm:pb-4 px-3 sm:px-4 pl-6 sm:pl-9">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
