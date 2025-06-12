import HomeComponent from "app/(pages)/home";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};
export const metadata = {
  title: "GoCredo: Top Website Development & Digital Marketing in Jaipur",
  description: "Grow your business with GoCredo’s expert web development, SEO, PPC, and digital marketing services in Jaipur, Rajasthan. Start now!",
  keywords: "website development Jaipur, digital marketing Jaipur, SEO services Rajasthan, PPC advertising, social media marketing, GoCredo, best digital marketing agency Jaipur, affordable SEO services Rajasthan",
  charset: "utf-8",
  robots: "index, follow",
  sitemap: "https://gocredo.in/sitemap.xml",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "GoCredo: Skyrocket Your Business with Digital Marketing in Jaipur",
    description: "Skyrocket your business with GoCredo’s expert web development, SEO, and digital marketing in Jaipur. Start today!",
    url: "https://gocredo.in?utm_source=social&utm_medium=og_image&utm_campaign=home",
    type: "website",
    images: [
      {
        url: "https://gocredo.in/images/skyrocket-digital-marketing.jpg",
        width: 1200,
        height: 630,
        alt: "GoCredo Digital Marketing and Web Development Services in Jaipur, Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoCredo: Skyrocket Your Business with Digital Marketing in Jaipur",
    description: "Skyrocket your business with GoCredo’s expert web development, SEO, and digital marketing in Jaipur. Start today!",
    images: ["https://gocredo.in/images/skyrocket-digital-marketing.jpg"],
    site: "@gocredo",
  },
  alternates: {
    canonical: "https://gocredo.in",
    languages: {
      "en-IN": "https://gocredo.in",
    },
  },
};

export default function Home() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "WebDesignAgency"],
      name: "GoCredo",
      url: "https://gocredo.in",
      telephone: "+91-9211691306",
      description: "GoCredo provides expert website development, SEO, PPC, and digital marketing services in Jaipur, Rajasthan to help businesses grow.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123, Example Street, Vaishali Nagar", // Replace with actual address
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302017",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "26.8617",
        longitude: "75.8101",
      },
      image: "https://gocredo.in/assets/logo.png",
      priceRange: "$$",
      openingHours: "Mo-Fr 09:00-18:00",
      sameAs: [
        "https://www.instagram.com/gocredo",
        "https://medium.com/@gocredo",
        "https://www.linkedin.com/company/gocredo",
        "https://twitter.com/gocredo",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Digital Marketing and Web Development",
      provider: {
        "@type": "LocalBusiness",
        name: "GoCredo",
        url: "https://gocredo.in",
      },
      areaServed: {
        "@type": "Place",
        name: "Jaipur, Rajasthan",
      },
      description: "Expert website development, SEO, PPC, and social media marketing services to grow your business in Jaipur.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://gocredo.in",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomeComponent />
    </div>
  );
}