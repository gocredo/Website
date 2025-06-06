import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET() {
  try {
    const response = await fetch("https://medium.com/feed/@gocredo.team", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Next.js Bot/1.0)",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xml = await response.text();
    const data = await parseStringPromise(xml);
    const items = data.rss.channel[0].item.slice(0, 3);

    const posts = items.map((post: any) => {
      const contentEncoded = post["content:encoded"]?.[0] || "";
      const excerpt = contentEncoded.replace(/<[^>]+>/g, "").substring(0, 100) + "...";
      const imageMatch = contentEncoded.match(/<img[^>]+src=["'](.*?)["']/i);
      return {
        id: post.guid?.[0]?.["_"]?.split("/").pop() ?? post.link?.[0]?.split("/").pop() ?? "",
        title: post.title?.[0] ?? "Untitled",
        excerpt: excerpt || "No excerpt available",
        date: post.pubDate?.[0]
          ? new Date(post.pubDate[0]).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "Unknown date",
        slug: `/blog/medium/${post.guid?.[0]?.["_"]?.split("/").pop() ?? post.link?.[0]?.split("/").pop() ?? ""}`,
        image: imageMatch?.[1] || "/images/placeholder.jpg",
        mediumLink: post.link?.[0] ?? "#",
      };
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return NextResponse.json({ error: "Failed to fetch Medium posts" }, { status: 500 });
  }
}