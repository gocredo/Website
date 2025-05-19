import HomeComponent  from "app/(pages)/home"
// import { generateMetadata } from "@/lib/utils/seo"

// export const metadata = generateMetadata({
//   title: "goCredo - Digital Marketing Agency",
//   description: "Boost your business with goCredo's SEO, PPC, and social media services.",
// })

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <HomeComponent/>
    </div>
  )
}
