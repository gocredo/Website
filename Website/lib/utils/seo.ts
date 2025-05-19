// SEO utility function to generate metadata for pages
export function generateMetadata({
  title,
  description,
  openGraph = {},
  twitter = {},
  robots = "index, follow",
}: {
  title: string
  description: string
  openGraph?: {
    title?: string
    description?: string
    images?: string[]
    url?: string
    type?: string
  }
  twitter?: {
    title?: string
    description?: string
    images?: string[]
    card?: string
  }
  robots?: string
}) {
  return {
    title,
    description,
    openGraph: {
      title: openGraph.title || title,
      description: openGraph.description || description,
      images: openGraph.images || ["/og-image.jpg"],
      url: openGraph.url || "https://gocredo.com",
      type: openGraph.type || "website",
    },
    twitter: {
      title: twitter.title || title,
      description: twitter.description || description,
      images: twitter.images || ["/twitter-image.jpg"],
      card: twitter.card || "summary_large_image",
    },
    robots,
  }
}
