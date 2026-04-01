"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { teamMembers } from "../../../lib/teamData";   
// ─── TYPES ───────────────────────────────────────────────────────────────────
// ✅ Fixed & Recommended
type Project = (typeof teamMembers)[number]["projects"][number];
type Testimonial = (typeof teamMembers)[number]["testimonials"][number];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "5px 14px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        background: "rgba(255,0,0,0.12)",
        color: "#ff4533",
        border: "1px solid rgba(255,69,51,0.25)",
      }}
    >
      {children}
    </span>
  );
}

function SkillTag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 14px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#999",
        margin: "4px",
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#111" }}>
        <iframe
          src={project.youtube}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allowFullScreen
          title={project.title}
        />
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <p style={{ fontSize: "15px", fontWeight: 500, color: "#fcfcfa", letterSpacing: "-0.02em", marginBottom: "8px" }}>
          {project.title}
        </p>
        <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "14px" }}>
          {project.description}
        </p>
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 500,
            background: "rgba(0,200,80,0.1)",
            color: "#3ecf6e",
            border: "1px solid rgba(62,207,110,0.2)",
          }}
        >
          {project.result}
        </span>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <p style={{ fontSize: "14px", fontWeight: 500, color: "#999", lineHeight: "1.6", letterSpacing: "-0.01em" }}>
        "{testimonial.quote}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "999px",
            background: "rgba(255,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 600,
            color: "#ff4533",
            flexShrink: 0,
          }}
        >
          {testimonial.name[0]}
        </div>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 500, color: "#fcfcfa", letterSpacing: "-0.02em" }}>
            {testimonial.name}
          </p>
          <p style={{ fontSize: "12px", color: "#555" }}>{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({
  children,
  id,
  style,
}: {
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      style={{
        padding: "80px 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <span
        style={{
          display: "inline-block",
          padding: "8px 16px",
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          background: "rgba(13,13,13,0.4)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#fcfcfa",
          backdropFilter: "blur(5px)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontSize: "clamp(36px, 5vw, 60px)",
        fontWeight: 500,
        letterSpacing: "-0.04em",
        lineHeight: 1.1,
        textAlign: "center",
        color: "#fcfcfa",
        marginBottom: "16px",
      }}
    >
      {children}
    </h2>
  );
}

// ─── GLOW BLOB ───────────────────────────────────────────────────────────────
function GlowBlob({
  top,
  left,
  right,
  bottom,
  opacity = 0.15,
}: {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, #ff0000, transparent 70%)",
        filter: "blur(80px)",
        opacity,
        pointerEvents: "none",
        top,
        left,
        right,
        bottom,
        zIndex: 0,
      }}
    />
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function TeamMemberPortfolio() {
  const params = useParams();
  const slug = params?.slug as string;

  const person = teamMembers.find((member) => member.slug === slug);

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!person) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "#fcfcfa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "'Satoshi', sans-serif",
        }}
      >
        <h1 style={{ fontSize: "64px", marginBottom: "16px" }}>404</h1>
        <p style={{ fontSize: "24px", marginBottom: "32px" }}>Team member not found</p>
        <a
          href="/about"
          style={{
            padding: "12px 28px",
            background: "#ff0000",
            color: "#fff",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          ← Back to Team
        </a>
      </div>
    );
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#fcfcfa",
    fontFamily: "'Satoshi', 'Inter', sans-serif",
    overflowX: "hidden",
  };

  // ── HERO ────────────────────────────────────────────────────────────────────
  const hero = (
    <Section
      id="hero"
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        padding: "200px 64px 250px",
        gap: 0,
      }}
    >
      <GlowBlob top="-200px" left="50%" opacity={0.2} />

      <div
        style={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          maxWidth: "800px",
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255,0,0,0.2), rgba(255,0,0,0.05))",
            border: "2px solid rgba(255,69,51,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: 600,
            color: "#ff4533",
            marginBottom: "12px",
            flexShrink: 0,
          }}
        >
          {person.avatar ? (
            <img
              src={person.avatar}
              alt={person.name}
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            person.name[0]
          )}
        </div>

        <Badge>{person.role}</Badge>

        <h1
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(38px, 7vw, 80px)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "#fcfcfa",
            marginTop: "8px",
          }}
        >
          Ready to{" "}
          <em
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#ff0000",
              letterSpacing: "0",
            }}
          >
            scale
          </em>{" "}
          your brand with editing?
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 500,
            color: "#999",
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
            maxWidth: "560px",
            marginTop: "8px",
          }}
        >
          {person.bio}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href={`mailto:${person.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              background: "#ff0000",
              color: "#fff",
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              textDecoration: "none",
              boxShadow: "0 4px 10px -2px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,69,51,0.12)",
              backdropFilter: "blur(10px)",
            }}
          >
            Book a call
          </a>
          <a
            href="#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              background: "rgba(10,10,10,0.5)",
              color: "#fcfcfa",
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            See my work
          </a>
        </div>
      </div>
    </Section>
  );

  // ── SKILLS ──────────────────────────────────────────────────────────────────
  const skills = (
    <Section id="skills" style={{ padding: "64px", gap: "40px" }}>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <SectionLabel>Skills</SectionLabel>
        <SectionHeading>
          What I{" "}
          <em style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#ff0000" }}>
            bring
          </em>{" "}
          to the table.
        </SectionHeading>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "800px",
          zIndex: 1,
        }}
      >
        {person.skills.map((skill) => (
          <SkillTag key={skill} label={skill} />
        ))}
      </div>
    </Section>
  );

  // ── PROJECTS ────────────────────────────────────────────────────────────────
  const projects = (
    <Section id="projects" style={{ padding: "64px", gap: "48px" }}>
      <GlowBlob top="-100px" right="-200px" opacity={0.1} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <SectionLabel>Editing Work</SectionLabel>
        <SectionHeading>
          Long form editing{" "}
          <em style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#ff0000" }}>
            work.
          </em>
        </SectionHeading>
        <p
          style={{
            fontSize: "20px",
            fontWeight: 500,
            color: "#999",
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          A selection of my best work across creators and brands.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "987px",
          zIndex: 1,
        }}
      >
        {person.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );

  // ── TESTIMONIALS ────────────────────────────────────────────────────────────
  const testimonials = (
    <Section id="testimonials" style={{ padding: "64px", gap: "48px" }}>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <SectionLabel>Testimonials</SectionLabel>
        <SectionHeading>
          There&apos;s a reason people are{" "}
          <em style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#ff0000" }}>
            raving
          </em>{" "}
          about me.
        </SectionHeading>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          width: "100%",
          maxWidth: "1000px",
          zIndex: 1,
        }}
      >
        {person.testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </div>
    </Section>
  );

  // ── CONNECT ─────────────────────────────────────────────────────────────────
  const connect = (
    <Section id="connect" style={{ padding: "64px 64px 100px", gap: "12px" }}>
      <GlowBlob bottom="-200px" left="50%" opacity={0.2} />

      <div
        style={{
          zIndex: 1,
          width: "100%",
          maxWidth: "1000px",
          background: "rgba(13,13,13,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          backdropFilter: "blur(5px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-300px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "conic-gradient(red 0deg, #ff001a 54deg, #00a6ff 107deg, #4797ff 162deg, #004 252deg, #f80 306deg, red 360deg)",
            filter: "blur(80px)",
            opacity: 0.15,
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(32px, 4.5vw, 62px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              color: "#fcfcfa",
              marginBottom: "16px",
            }}
          >
            Ready to scale your brand to{" "}
            <em style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#ff0000" }}>
              new heights?
            </em>
          </h2>

          <p style={{ fontSize: "18px", color: "#e3caca", fontWeight: 400 }}>
            It might be the start of something big!
          </p>
        </div>

        {/* Social pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <a
            href={`mailto:${person.email}`}
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#ccc",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            {person.email}
          </a>
          <a
            href={person.social.youtube.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(255,69,51,0.4)",
              color: "#ff4533",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            YouTube · {person.social.youtube.subscribers}
          </a>
          <a
            href={person.social.instagram.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(236,72,153,0.4)",
              color: "#ec4899",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {person.social.instagram.handle}
          </a>
        </div>

        <a
          href={`mailto:${person.email}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 28px",
            borderRadius: "12px",
            background: "#ff0000",
            color: "#fff",
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            textDecoration: "none",
            boxShadow: "0 4px 10px -2px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,69,51,0.12)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Book a call
        </a>
      </div>
    </Section>
  );

  return (
    <div style={containerStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
      `}</style>

      {hero}
      <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)" }} />
      {skills}
      <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)" }} />
      {projects}
      <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)" }} />
      {testimonials}
      <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)" }} />
      {connect}
    </div>
  );
}