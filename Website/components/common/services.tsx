// components/home/services.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BarChart, Share2, Globe, TrendingUp, Mail, MapPin, ShoppingCart, ArrowUpRight, Video, Palette, Code, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Check, X } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconMap = {
  "Search Engine Optimization": <Search className="h-10 w-10 text-purple-400" />,
  "Pay-Per-Click Advertising": <BarChart className="h-10 w-10 text-purple-400" />,
  "Social Media Marketing": <Share2 className="h-10 w-10 text-purple-400" />,
  "Web Design & Development": <Globe className="h-10 w-10 text-purple-400" />,
  "Content Marketing": <TrendingUp className="h-10 w-10 text-purple-400" />,
  "Email Marketing": <Mail className="h-10 w-10 text-purple-400" />,
  "Analytics & Reporting": <BarChart className="h-10 w-10 text-purple-400" />,
  "Local SEO": <MapPin className="h-10 w-10 text-purple-400" />,
  "E-commerce Marketing": <ShoppingCart className="h-10 w-10 text-purple-400" />,
  "Conversion Rate Optimization": <ArrowUpRight className="h-10 w-10 text-purple-400" />,
  "Video Marketing": <Video className="h-10 w-10 text-purple-400" />,
  "Logo Design & Branding": <Palette className="h-10 w-10 text-purple-400" />,
  "Website Development Tools": <Code className="h-10 w-10 text-purple-400" />,
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Digital Solutions</h2>
          <p className="text-gray-400 text-lg">
            Explore our tailored packages for branding, marketing, and web development to drive your business growth.
          </p>
        </motion.div>

        <Tabs defaultValue="packages" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 gap-4 mb-12">
            <TabsTrigger value="packages">Service Packages</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Plans</TabsTrigger>
            <TabsTrigger value="branding">Branding Packages</TabsTrigger>
            <TabsTrigger value="development">Development Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="packages">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {packages.map((pkg, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {pkg.services.map((service, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            {service.included ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-red-500" />
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {marketingPlans.map((plan, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.services.map((service, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            {service.included ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : service.value ? (
                              <FileText className="h-5 w-5 text-purple-400" />
                            ) : (
                              <X className="h-5 w-5 text-red-500" />
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
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {brandingPackages.map((pkg, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {pkg.services.map((service, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            {service.included ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-red-500" />
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
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {developmentTools.map((pkg, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {pkg.tools.map((tool, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            {tool.included ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-red-500" />
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