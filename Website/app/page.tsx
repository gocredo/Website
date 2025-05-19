import { Hero } from "@/components/home/hero"
import { Services } from "@/components/home/services"
import { Features } from "@/components/home/features"
import { TestimonialCarousel } from "@/components/home/testimonial-carousel"
import { Stats } from "@/components/home/stats"
import { Clients } from "@/components/home/clients"
import { Cta } from "@/components/home/cta"
import { ContactForm } from "@/components/home/contact-form"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { generateMetadata } from "@/lib/utils/seo"

export const metadata = generateMetadata({
  title: "goCredo - Digital Marketing Agency",
  description: "Boost your business with goCredo's SEO, PPC, and social media services.",
})

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <Header />
      <Hero />
      <Clients />
      <Services />
      <Features />
      <Stats />
      <TestimonialCarousel />
      <Cta />
      <ContactForm />
      <Footer />
    </div>
  )
}
