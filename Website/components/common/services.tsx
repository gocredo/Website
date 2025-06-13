"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BarChart, Share2, Globe, TrendingUp, Mail, MapPin, ShoppingCart, ArrowUpRight, Video, Palette, Code, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconMap = {
  "Search Engine Optimization": <Search className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Pay-Per-Click Advertising": <BarChart className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Social Media Marketing": <Share2 className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Web Design & Development": <Globe className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Content Marketing": <TrendingUp className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Email Marketing": <Mail className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Analytics & Reporting": <BarChart className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Local SEO": <MapPin className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "E-commerce Marketing": <ShoppingCart className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Conversion Rate Optimization": <ArrowUpRight className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Video Marketing": <Video className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Logo Design & Branding": <Palette className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
  "Website Development Tools": <Code className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />,
};

interface ServiceData {
  packages?: Array<{
    name: string;
    services: Array<{ name: string; included: boolean }>;
  }>;
  marketingPlans?: Array<{
    name: string;
    services: Array<{ name: string; included?: boolean; value?: string }>;
  }>;
  brandingPackages?: Array<{
    name: string;
    services: Array<{ name: string; included: boolean }>;
  }>;
  developmentTools?: Array<{
    name: string;
    tools: Array<{ name: string; included: boolean }>;
  }>;
}

export function ServicesTab({ data = {} as ServiceData }) {
  const {
    packages = [
      {
        name: "Branding 0.0",
        services: [
          { name: "Social Media Marketing", included: false },
          { name: "Search Engine Optimization", included: false },
          { name: "Pay-Per-Click Advertising", included: false },
          { name: "Email Marketing", included: false },
          { name: "Website Design & Development Tools", included: false },
          { name: "Analytics", included: false },
          { name: "Content Marketing", included: false },
          { name: "Logo Design & Branding", included: true },
          { name: "Ongoing Support (2–6 mo)", included: false },
        ],
      },
      {
        name: "Marketing-only 1.0",
        services: [
          { name: "Social Media Marketing", included: true },
          { name: "Search Engine Optimization", included: true },
          { name: "Pay-Per-Click Advertising", included: true },
          { name: "Email Marketing", included: true },
          { name: "Website Design & Development Tools", included: false },
          { name: "Analytics", included: false },
          { name: "Content Marketing", included: false },
          { name: "Logo Design & Branding", included: false },
          { name: "Ongoing Support (2–6 mo)", included: false },
        ],
      },
      {
        name: "Web & Dev 2.0",
        services: [
          { name: "Social Media Marketing", included: false },
          { name: "Search Engine Optimization", included: true },
          { name: "Pay-Per-Click Advertising", included: false },
          { name: "Email Marketing", included: false },
          { name: "Website Design & Development Tools", included: true },
          { name: "Analytics", included: true },
          { name: "Content Marketing", included: false },
          { name: "Logo Design & Branding", included: false },
          { name: "Ongoing Support (2–6 mo)", included: false },
        ],
      },
      {
        name: "Compiled 3.0",
        services: [
          { name: "Social Media Marketing", included: true },
          { name: "Search Engine Optimization", included: true },
          { name: "Pay-Per-Click Advertising", included: true },
          { name: "Email Marketing", included: true },
          { name: "Website Design & Development Tools", included: true },
          { name: "Analytics", included: true },
          { name: "Content Marketing", included: false },
          { name: "Logo Design & Branding", included: true },
          { name: "Ongoing Support (2–6 mo)", included: true },
        ],
      },
    ],
    marketingPlans = [
      {
        name: "Basic Plan",
        services: [
          { name: "Social Media Setup", included: true },
          { name: "Content Calendar Creation (Monthly)", included: false },
          { name: "Social Media Post Design (per month)", value: "5 Posts" },
          { name: "Instagram/Facebook/LinkedIn Mgmt", value: "1 Platform" },
          { name: "Hashtag & Trend Research", included: false },
          { name: "Paid Ads (Google / Meta) Setup", included: false },
          { name: "Email Campaign (Newsletter & Offers)", included: false },
          { name: "Analytics & Reporting", included: false },
          { name: "Influencer/Local Partner Outreach", included: false },
          { name: "WhatsApp Business Campaign", included: false },
          { name: "SEO (On-page + Local SEO)", value: "Basic Only" },
        ],
      },
      {
        name: "Growth Plan",
        services: [
          { name: "Social Media Setup", included: true },
          { name: "Content Calendar Creation (Monthly)", included: true },
          { name: "Social Media Post Design (per month)", value: "12 Posts" },
          { name: "Instagram/Facebook/LinkedIn Mgmt", value: "2 Platforms" },
          { name: "Hashtag & Trend Research", included: true },
          { name: "Paid Ads (Google / Meta) Setup", included: false },
          { name: "Email Campaign (Newsletter & Offers)", value: "1/month" },
          { name: "Analytics & Reporting", value: "Monthly" },
          { name: "Influencer/Local Partner Outreach", value: "Optional" },
          { name: "WhatsApp Business Campaign", included: false },
          { name: "SEO (On-page + Local SEO)", value: "Advanced" },
        ],
      },
      {
        name: "Pro Plan",
        services: [
          { name: "Social Media Setup", included: true },
          { name: "Content Calendar Creation (Monthly)", included: true },
          { name: "Social Media Post Design (per month)", value: "20 Posts" },
          { name: "Instagram/Facebook/LinkedIn Mgmt", value: "3 Platforms" },
          { name: "Hashtag & Trend Research", included: true },
          { name: "Paid Ads (Google / Meta) Setup", included: true },
          { name: "Email Campaign (Newsletter & Offers)", value: "4/month" },
          { name: "Analytics & Reporting", value: "Weekly" },
          { name: "Influencer/Local Partner Outreach", included: true },
          { name: "WhatsApp Business Campaign", included: true },
          { name: "SEO (On-page + Local SEO)", value: "Full SEO" },
        ],
      },
    ],
    brandingPackages = [
      {
        name: "Basic",
        services: [
          { name: "Logo Design (2 Concepts)", included: true },
          { name: "Unlimited Revisions", included: false },
          { name: "Color Palette & Typography Guide", included: false },
          { name: "Brand Style Guide (PDF)", included: false },
          { name: "Social Media Logo Versions", included: true },
          { name: "Logo in All Formats (PNG, SVG, etc.)", included: true },
          { name: "Business Card Mockups", included: false },
          { name: "Letterhead + Envelope Design", included: false },
        ],
      },
      {
        name: "Professional",
        services: [
          { name: "Logo Design (2 Concepts)", included: true },
          { name: "Unlimited Revisions", included: true },
          { name: "Color Palette & Typography Guide", included: true },
          { name: "Brand Style Guide (PDF)", included: true },
          { name: "Social Media Logo Versions", included: true },
          { name: "Logo in All Formats (PNG, SVG, etc.)", included: true },
          { name: "Business Card Mockups", included: true },
          { name: "Letterhead + Envelope Design", included: true },
        ],
      },
    ],
    developmentTools = [
      {
        name: "CMS-Launch Package",
        tools: [
          { name: "Figma / Adobe XD", included: true },
          { name: "WordPress / Webflow", included: true },
          { name: "React / Next.js / Vue.js", included: false },
          { name: "Tailwind CSS / Bootstrap", included: false },
          { name: "Node.js / Express.js / PHP / Django", included: false },
          { name: "Firebase / MongoDB / MySQL / PostgreSQL", included: true },
          { name: "Hosting & Domain Management", included: true },
          { name: "Marketing & SEO Tools", included: true },
          { name: "Payment & Invoicing Tools", included: true },
          { name: "Analytics & Reporting", included: false },
          { name: "Security & Backup", included: true },
        ],
      },
      {
        name: "Custom",
        tools: [
          { name: "Figma / Adobe XD", included: true },
          { name: "WordPress / Webflow", included: false },
          { name: "React / Next.js / Vue.js", included: true },
          { name: "Tailwind CSS / Bootstrap", included: true },
          { name: "Node.js / Express.js / PHP / Django", included: true },
          { name: "Firebase / MongoDB / MySQL / PostgreSQL", included: true },
          { name: "Hosting & Domain Management", included: true },
          { name: "Marketing & SEO Tools", included: true },
          { name: "Payment & Invoicing Tools", included: true },
          { name: "Analytics & Reporting", included: true },
          { name: "Security & Backup", included: true },
        ],
      },
    ],
  } = data;

  const [activeTab, setActiveTab] = useState("packages");

  return (
    <section id="services" className="py-10 sm:py-20 bg-gray-900/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-16"
        >
          <div className="inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-purple-400 mb-4">
            Our Services
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Comprehensive Digital Solutions</h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Explore our tailored packages for branding, marketing, and web development to drive your business growth.
          </p>
        </motion.div>

        <Tabs defaultValue="packages" className="w-full" onValueChange={setActiveTab}>
         <TabsList className="flex flex-wrap justify-center gap-2 sm:gap-4 rounded-md bg-gray-800 border border-gray-700 mb-20 sm:mb-12">
            <TabsTrigger value="packages" className="flex-1 min-w-[100px] text-xs sm:text-sm py-2">
              Service Packages
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex-1 min-w-[100px] text-xs sm:text-sm py-2">
              Marketing Plans
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex-1 min-w-[100px] text-xs sm:text-sm py-2">
              Branding Packages
            </TabsTrigger>
            <TabsTrigger value="development" className="flex-1 min-w-[100px] text-xs sm:text-sm py-2">
              Development Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="mt-10">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
            >
              {packages.map((pkg, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl font-bold">{pkg.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm sm:text-base">
                        {pkg.services.map((service, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            {service.included ? (
                              <span className="inline-block rounded-full bg-green-500/20 text-green-400 text-xs sm:text-sm font-medium px-2 py-1">
                                ✅
                              </span>
                            ) : (
                              <span className="inline-block rounded-full bg-red-500/20 text-red-400 text-xs sm:text-sm font-medium px-2 py-1">
                                ❌
                              </span>
                            )}
                            <span className="text-gray-400">{service.name}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="marketing">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
            >
              {marketingPlans.map((plan, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl font-bold">{plan.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm sm:text-base">
                        {plan.services.map((service, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            {service.included ? (
                              <span className="inline-block rounded-full bg-green-500/20 text-green-400 text-xs sm:text-sm font-medium px-2 py-1">
                                ✅
                              </span>
                            ) : service.value ? (
                              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                            ) : (
                              <span className="inline-block rounded-full bg-green-500/20 text-green-400 text-xs sm:text-sm font-medium px-2 py-1">
                                ❌
                              </span>
                            )}
                            <span className="text-gray-400">
                              {service.name} {service.value && <span>({service.value})</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="branding">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8"
            >
              {brandingPackages.map((pkg, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl font-bold">{pkg.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm sm:text-base">
                        {pkg.services.map((service, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            {service.included ? (
                              <span className="inline-block rounded-full bg-green-500/20 text-green-400 text-xs sm:text-sm font-medium px-2 py-1">
                                ✅
                              </span>
                            ) : (
                              <span className="inline-block rounded-full bg-red-500/20 text-red-400 text-xs sm:text-sm font-medium px-2 py-1">
                                ❌
                              </span>
                            )}
                            <span className="text-gray-400">{service.name}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="development">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8"
            >
              {developmentTools.map((pkg, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl font-bold">{pkg.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm sm:text-base">
                        {pkg.tools.map((tool, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            {tool.included ? (
                              <span className="inline-block rounded-full bg-green-500/20 text-green-400 text-xs sm:text-sm font-medium px-2 py-1">
                                ✅
                              </span>
                            ) : (
                              <span className="inline-block rounded-full bg-red-500/20 text-red-400 text-xs sm:text-sm font-medium px-2 py-1">
                                ❌
                              </span>
                            )}
                            <span className="text-gray-400">{tool.name}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}