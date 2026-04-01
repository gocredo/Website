// lib/teamData.js
const teamMembers = [
  {
    slug: "alok",
    name: "Alok",
    role: "Video Editor / Creative",
    bio: "I craft high-retention content that scales personal brands. From long-form YouTube edits to punchy short-form reels — every frame is intentional, every cut is deliberate.",
    avatar: "/images/team/alok.jpg", // replace with image URL when ready
    email: "alok@email.com",
    image: "/images/team/alok.jpg",
    social: {
      youtube: { link: "https://youtube.com", label: "YouTube", subscribers: "10K+" },
      instagram: { link: "https://instagram.com", handle: "@alok.edits" },
    },
    skills: [
      "Video Editing",
      "Short-form Reels",
      "Colour Grading",
      "Motion Graphics",
      "Thumbnail Design",
      "Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "YouTube Strategy",
      "Brand Storytelling",
      "VSL Production",
      "Sound Design",
    ],
    projects: [
      {
        youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Long-form YouTube Edit",
        description: "Full production edit for a business/finance creator — scripted, paced, and colour graded for maximum retention.",
        result: "+40% watch time",
        resultColor: "green",
      },
      {
        youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Instagram Reels Campaign",
        description: "Series of 15–30 sec reels for a personal brand — fast cuts, captions, trending audio sync.",
        result: "2× follower growth",
        resultColor: "green",
      },
      {
        youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "VSL Production",
        description: "High-converting video sales letter with motion graphics, b-roll, and professional sound design.",
        result: "3× conversion rate",
        resultColor: "green",
      },
      {
        youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Thumbnail Design Pack",
        description: "Custom thumbnail series for a YouTube channel — boosted click-through rate significantly.",
        result: "+28% CTR",
        resultColor: "green",
      },
    ],
    testimonials: [
      {
        quote: "Alok doesn't just edit videos — he edits stories. Our watch time went through the roof overnight.",
        name: "William N.",
        role: "Content Creator",
      },
      {
        quote: "Delivery was always on time and the quality was top-notch. Looking for long-term collaboration.",
        name: "Scott H.",
        role: "Lead Generation Consultant",
      },
      {
        quote: "He blew the previous editor we worked with out of the water. Absolutely next level.",
        name: "Stedman W.",
        role: "Business Consultant",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // ADD MORE TEAM MEMBERS BELOW (just copy the structure above)
  // ──────────────────────────────────────────────────────────────
  // {
  //   slug: "priya",
  //   name: "Priya Sharma",
  //   role: "Motion Designer / Animator",
  //   bio: "...",
  //   avatar: null,
  //   email: "priya@email.com",
  //   social: { youtube: {...}, instagram: {...} },
  //   skills: [...],
  //   projects: [...],
  //   testimonials: [...]
  // }
];

export { teamMembers };