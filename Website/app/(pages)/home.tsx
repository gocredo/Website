"use client";

import { Suspense } from "react";
import { Hero } from "../../components/home/hero";
import { ServicesTab } from "../../components/common/services";
import { Features } from "../../components/home/features";
import { TestimonialCarousel } from "../../components/home/testimonial-carousel";
import { Stats } from "../../components/home/stats";
import { Clients } from "../../components/home/clients";
import { Cta } from "../../components/home/cta";
import { ContactForm } from "../../components/home/contact-form";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";
import { useToast } from "../../lib/toast/useToast";

function HomeContent() {
  const { toast } = useToast(); 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <Header />
      <Hero />
      <Clients />
      <ServicesTab />
      <Features />
      <Stats />
      <TestimonialCarousel />
      <Cta />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}