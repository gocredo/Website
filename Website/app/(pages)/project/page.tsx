"use client";

import { motion } from "framer-motion";
import { Header } from "../../../components/layout/header"
import { Footer } from "../../../components/layout/footer"
import WhatWeDid from "../../../components/project/whatWeDid";
import Achievements from "../../../components/project/achievement";
import {ContactForm} from "../../../components/home/contact-form";

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-24 pb-12 px-4 md:px-12 container mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-16">
            Explore our portfolio of successful projects that have delivered exceptional results for our clients.
          </p>
        </motion.div>

        <WhatWeDid />
        <Achievements />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}