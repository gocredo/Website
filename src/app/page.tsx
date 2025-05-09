import { Hero } from "@/components/home/Hero";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { ContactForm } from "@/components/home/ContactForm";
import { generateMetadata } from "@/lib/utils/seo";

export const metadata = generateMetadata({
  title: "goCredo - Digital Marketing Agency",
  description: "Boost your business with goCredo's SEO, PPC, and social media services.",
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <Hero />
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center">Our Services</h2>
        {/* Service cards */}
      </section>
      <TestimonialCarousel />
      <ContactForm />
      {/* <Footer /> */}
    </div>
  );
}