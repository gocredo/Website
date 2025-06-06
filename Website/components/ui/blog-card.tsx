// components/BlogCard.tsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  link: string;
}

export default function BlogCard({ title, excerpt, date, image, link }: BlogCardProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
      <CardHeader>
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            onError={(e) => {
              console.warn(`Image failed to load: ${image}`);
              e.currentTarget.src = "/images/image.jpg";
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-sm mb-2">{date}</p>
        <CardTitle className="text-xl font-bold mb-2">
          <Link href={link} className="hover:text-purple-400 transition-colors">
            {title}
          </Link>
        </CardTitle>
        <p className="text-gray-400">{excerpt}</p>
      </CardContent>
    </Card>
  );
}
