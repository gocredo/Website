import { NextResponse } from "next/server";
import Parser from "rss-parser";
import sanitizeHtml from "sanitize-html";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Await params to access id
    const parser = new Parser();
    const feed = await parser.parseURL("https://medium.com/feed/@gocredo.team");
    
    console.log("Requested Post ID:", id);
    console.log("Available Post GUIDs:", feed.items.map(item => item.guid));

    if (!feed.items || feed.items.length === 0) {
      return NextResponse.json({ error: "No posts available in the Medium feed" }, { status: 404 });
    }

    // Match post by guid or the last part of the guid/link
    const post = feed.items.find((item) => {
      const guid = item.guid?.split("/").pop();
      const link = item.link?.split("/").pop();
      return guid === id || link === id;
    });

    if (!post) {
      return NextResponse.json({ error: `Post with ID ${id} not found` }, { status: 404 });
    }

    const sanitizedContent = sanitizeHtml(post["content:encoded"] || post.content || post.description || "", {
      allowedTags: [
        "h1", "h2", "h3", "h4", "p", "a", "ul", "ol", "li", "strong", "em", "img", "blockquote", "code", "pre",
        "div", "span", "br", "hr", "table", "tr", "td", "th", "tbody", "thead",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt", "width", "height"],
        div: ["style"],
        span: ["style"],
        table: ["style"],
        tr: ["style"],
        td: ["style"],
        th: ["style"],
      },
      allowedStyles: {
        "*": {
          "text-align": [/^left$/, /^right$/, /^center$/],
          "margin": [/^[\d.]+(px|rem|em)$/],
          "padding": [/^[\d.]+(px|rem|em)$/],
          "font-size": [/^[\d.]+(px|rem|em)$/],
          "line-height": [/^[\d.]+$/],
        },
      },
    });

    return NextResponse.json({
      id: post.guid?.split("/").pop() || post.link?.split("/").pop() || "",
      title: post.title || "Untitled",
      content: sanitizedContent,
      date: post.pubDate
        ? new Date(post.pubDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "Unknown date",
      image: post.thumbnail || post.enclosure?.url || "/images/placeholder.jpg",
    });
  } catch (error: any) {
    console.error("Error fetching Medium post:", error.message);
    return NextResponse.json({ error: "Failed to fetch post from Medium" }, { status: 500 });
  }
}