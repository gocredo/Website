"use client";

import { motion } from "framer-motion";
import { Header } from "../../../components/layout/header"
import { Footer } from "../../../components/layout/footer"
import Analytics from "../../../components/about/analytics";
import Vision from "../../../components/about/vision";
import WhyChooseUs from "../../../components/common/whyChooseUs";
import Process from "../../../components/common/process";
import ContactCTA from "../../../components/common/contactCta";
import TeamSection from "../../../components/about/teamSection";
import { getAboutPage } from '../../../lib/api';
import { useEffect, useState } from "react";

interface AboutPageData {
  description: string;
  mission: string;
  vision: string;
}

export default function About() {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAboutPage('f6d61837-89d1-412b-a967-052913e92f31');
        setAboutData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load about page data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
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
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Creado
            </span>
          </h1>
          {/* <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-16">
            A creative design studio with a passion for crafting beautiful digital experiences that drive results.
          </p> */}
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-16">
            {aboutData?.description || 'No description available'}
          </p>
        </motion.div>

        <Analytics />
        {/* <Vision /> */}
        <Vision mission={aboutData?.mission} vision={aboutData?.vision} />
        <WhyChooseUs />
        <Process />
        <TeamSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}