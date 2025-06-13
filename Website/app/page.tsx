import HomeComponent from "app/(pages)/home";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: "GoCredo: Jaipur-Based Agency for Website Development & Digital Marketing Across India",
  description: "Grow your business with GoCredo, a trusted Jaipur-based agency offering expert web development, SEO, social media handling, ads, PPC, and digital marketing services across India. Start now!",
  keywords: "website development India, digital marketing India, Jaipur-based agency, SEO services India, PPC advertising, social media marketing, GoCredo, best digital marketing agency Jaipur, affordable SEO services Rajasthan",
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
    title: "GoCredo: Jaipur-Based Agency to Skyrocket Your Business Across India",
    description: "Skyrocket your business with GoCredo, a Jaipur-based agency offering expert web development, SEO, social media handling, ads, and digital marketing services across India. Start today!",
    url: "https://gocredo.in?utm_source=social&utm_medium=og_image&utm_campaign=home",
    type: "website",
    images: [
      {
        url: "https://gocredo.in/images/skyrocket-digital-marketing.png",
        width: 1200,
        height: 630,
        alt: "GoCredo Jaipur-Based Digital Marketing and Web Development Services for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoCredo: Jaipur-Based Agency to Skyrocket Your Business Across India",
    description: "Skyrocket your business with GoCredo, a Jaipur-based agency offering expert web development, SEO, social media handling, ads, and digital marketing services across India. Start today!",
    images: ["https://gocredo.in/images/skyrocket-digital-marketing.png"],
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
      "@type": ["LocalBusiness", "WebDesignAgency","Marketing"],
      name: "GoCredo",
      url: "https://gocredo.in",
      telephone: "+91-9211691306",
      description: "GoCredo, a Jaipur-based agency, provides expert website development, SEO, social media handling, ads, PPC, and digital marketing services to help businesses grow across India.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Malaviya Nagar,", 
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
      image: "https://gocredo.in/images/placeholder.jpg",
      priceRange: "$$",
      openingHours: "Mo-Fr 09:00-18:00",
      sameAs: [
        "https://www.instagram.com/gocredo",
        "https://medium.com/@gocredo",
        "https://www.linkedin.com/company/gocredo",
        "https://twitter.com/gocredo",
      ],
      areaServed: [
        {
          "@type": "Country",
          name: "India",
        },
        {
          "@type": "City",
          name: "Jaipur",
        },
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
      areaServed: [
        {
          "@type": "Country",
          name: "India",
        },
        {
          "@type": "City",
          name: "Jaipur, Rajasthan",
        },
      ],
      description: "GoCredo, a Jaipur-based agency, offers expert website development, SEO, PPC, and social media marketing services to grow your business across India.",
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