import { Metadata } from "next";

type SeoProps = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
};

export function generateMetadata({
  title,
  description,
  keywords = ["digital marketing", "SEO", "PPC", "goCredo"],
  image = "/images/og-image.jpg",
}: SeoProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
  };
}