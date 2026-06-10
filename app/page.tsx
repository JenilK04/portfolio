"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  title: string;
  badge: string;
  badgeVariant: "cyan" | "violet";
  year: string;
  desc: string;
  stack: string[];
  link: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ROLES = [
  "Full Stack Developer",
  "Spring Boot + Next.js",
  "Blockchain / Web3",
  "Real-time Systems",
  "Freelance Dev",
];

const SKILL_GROUPS = [
  { label: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "React Native"] },
  { label: "Backend", skills: ["Spring Boot", "Java 21", "Node.js", "Express.js", "REST APIs"] },
  { label: "Database & Cache", skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch"] },
  { label: "Blockchain", skills: ["Solidity", "Ethereum", "MetaMask", "Web3.js", "Hardhat"] },
  { label: "DevOps & Cloud", skills: ["Docker", "AWS", "GitHub Actions", "CI/CD", "Nginx"] },
  { label: "Languages", skills: ["Java", "JavaScript", "TypeScript", "PHP", "Solidity"] },
];

const PROJECTS: Project[] = [
  {
    title: "AuctoWire",
    badge: "In Progress",
    badgeVariant: "cyan",
    year: "2024–25",
    desc: "India-first live bidding marketplace. Real-time auctions, KYC flows, Redis Lua race condition handling, and a React Native mobile app.",
    stack: ["Spring Boot", "Next.js 14", "Redis", "PostgreSQL", "React Native", "Elasticsearch"],
    link: "https://github.com/JenilK04",
  },
  {
    title: "Blockchain Voting System",
    badge: "Web3",
    badgeVariant: "violet",
    year: "2024",
    desc: "Decentralized election platform on Ethereum. Smart contracts handle vote casting and tallying — fully transparent, tamper-proof results.",
    stack: ["Solidity", "React.js", "MetaMask", "Hardhat", "Web3.js"],
    link: "https://github.com/JenilK04",
  },
  {
    title: "ROS Real Estate Platform",
    badge: "Real Estate",
    badgeVariant: "violet",
    year: "2024",
    desc: "Full-featured MERN real estate portal with property listings, search filters, user auth, and admin dashboard. Built during internship at Shivalik Developers.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "AWS S3"],
    link: "https://github.com/JenilK04",
  },
  {
    title: "Online Bidding System",
    badge: "Real-time",
    badgeVariant: "violet",
    year: "2023",
    desc: "Real-time bidding platform using Socket.IO for live bid updates, countdown timers, and instant notifications. The seed idea behind AuctoWire.",
    stack: ["Node.js", "Socket.IO", "Express.js", "MongoDB"],
    link: "https://github.com/JenilK04",
  },
];

const EXPERIENCE: Experience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "Shivalik Developers, Surat",
    period: "2024 · 6 months",
    bullets: [
      "Built a production-grade MERN real estate platform handling property listings, search, and user management.",
      "Developed a real-time auction module with live bidding, Socket.IO events, and bid history tracking.",
      "Integrated AWS S3 for document and image uploads; implemented JWT-based role authentication.",
      "Delivered features end-to-end — from database schema design to React UI and REST API.",
    ],
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Fiverr · Upwork · Contra",
    period: "2024 – Present",
    bullets: [
      "Building client projects across MERN, Java Full Stack, Blockchain/Solidity, and workflow automation.",
      "Reviewed and audited DeFi real estate smart contracts for a client — identified critical security vulnerabilities.",
      "Active across Fiverr, Upwork, Odesire, and Contra with gigs spanning multiple technology stacks.",
    ],
  },
];

// ─── Typewriter Hook ───────────────────────────────────────────────────────────
function useTypewriter(roles: string[]) {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const delay = deleting ? 45 : charIndex === current.length ? 1800 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = charIndex + 1;
        setText(current.slice(0, next));
        if (next === current.length) setDeleting(true);
        else setCharIndex(next);
      } else {
        const next = charIndex - 1;
        setText(current.slice(0, next));
        setCharIndex(next);
        if (next === 0) {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex, roles]);

  return text;
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ id, label, title, children }: {
  id: string; label: string; title: string; children: React.ReactNode;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 px-6 max-w-5xl mx-auto transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <p className="font-mono text-xs text-cyan-400 tracking-widest mb-2">{label}</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-100 mb-3">{title}</h2>
      <div className="w-12 h-0.5 bg-cyan-400 mb-10 rounded" />
      {children}
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const role = useTypewriter(ROLES);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="bg-[#0A0F1C] text-slate-200 min-h-screen scroll-smooth">

      {/* ── Fonts (add to layout.tsx or globals.css) ─────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-custom { font-family: 'JetBrains Mono', monospace; }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[rgba(10,15,28,0.85)] backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <span className="font-display font-bold text-cyan-400 text-lg tracking-wide">JK</span>
        <ul className="hidden md:flex gap-8 list-none">
          {["about", "skills", "projects", "experience", "contact"].map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className="text-slate-400 hover:text-cyan-400 text-xs uppercase tracking-widest transition-colors"
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-cyan-400"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            {navOpen
              ? <path d="M6 6l10 10M16 6l-10 10" />
              : <><path d="M4 6h14M4 11h14M4 16h14" /></>}
          </svg>
        </button>
      </nav>
      {navOpen && (
        <div className="md:hidden bg-[#111827] border-b border-slate-800 px-6 py-4 flex flex-col gap-4">
          {["about", "skills", "projects", "experience", "contact"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setNavOpen(false)}
              className="text-slate-400 hover:text-cyan-400 text-sm uppercase tracking-widest"
            >
              {s}
            </a>
          ))}
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-32 min-h-screen flex flex-col justify-center">
        <p className="font-mono-custom text-xs text-cyan-400 tracking-widest mb-5 flex items-center gap-2">
          ~/jenil-kovadiya
          <span className="inline-block w-0.5 h-4 bg-cyan-400 blink" />
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-slate-100 leading-none mb-3">
          Jenil Kovadiya
        </h1>
        <p className="font-display text-2xl md:text-3xl font-medium text-cyan-400 mb-6 min-h-[2.5rem]">
          {role}
          <span className="inline-block w-0.5 h-7 bg-cyan-400 blink ml-1 translate-y-0.5" />
        </p>
        <p className="text-slate-400 max-w-lg leading-relaxed mb-10">
          Full Stack Developer crafting production-grade web apps — from real-time auction systems
          to blockchain platforms. B.Tech CS &apos;26, P.P. Savani University.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="#projects"
            className="bg-cyan-400 text-[#0A0F1C] font-display font-bold px-7 py-3 rounded-md text-sm hover:opacity-85 transition-opacity"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-slate-700 text-slate-400 font-display px-7 py-3 rounded-md text-sm hover:border-cyan-400 hover:text-cyan-400 transition-colors"
          >
            Let&apos;s Talk
          </a>
        </div>
        <div className="flex gap-10 mt-14 pt-8 border-t border-slate-800">
          {[
            { num: "6+", label: "Months Professional Exp" },
            { num: "5+", label: "Projects Shipped" },
            { num: "8.29", label: "CGPA" },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="font-display text-2xl font-bold text-slate-100">{num}</p>
              <p className="text-xs text-slate-500 tracking-wide mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <Section id="about" label="// about" title="Who I Am">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-4 text-slate-400 leading-relaxed text-sm">
            <p>
              I&apos;m a{" "}
              <span className="text-cyan-400 font-medium">Full Stack Developer</span>{" "}
              based in Surat, India, specializing in building scalable, real-time web platforms.
              I care about clean architecture, performance, and shipping things that actually
              work in production.
            </p>
            <p>
              My stack spans{" "}
              <span className="text-cyan-400 font-medium">Spring Boot, React/Next.js, Node.js</span>
              , and I have hands-on experience with{" "}
              <span className="text-cyan-400 font-medium">Solidity/Ethereum, Redis, Docker, and AWS</span>
              . I&apos;m also active in freelancing — helping clients globally build custom software.
            </p>
            <p>
              Currently building{" "}
              <span className="text-cyan-400 font-medium">AuctoWire</span>
              , an India-first live bidding marketplace with real-time bidding, KYC flows, and a mobile app.
            </p>
          </div>
          <div className="bg-[#1A2035] border border-slate-800 rounded-xl p-6 space-y-5">
            {[
              { icon: "🎓", title: "B.Tech Computer Science", sub: "P.P. Savani University, Surat · 2022–2026" },
              { icon: "💼", title: "Full Stack Intern", sub: "Shivalik Developers · 6 months" },
              { icon: "📍", title: "Based in Surat, India", sub: "Open to remote & hybrid roles" },
              { icon: "⛓️", title: "Web3 Enthusiast", sub: "Solidity · Smart Contracts · DeFi" },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex gap-3 items-start">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="font-display font-semibold text-slate-100 text-sm">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <Section id="skills" label="// skills" title="Tech Stack">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_GROUPS.map(({ label, skills }) => (
            <div key={label} className="bg-[#1A2035] border border-slate-800 rounded-xl p-5">
              <p className="font-mono-custom text-xs text-cyan-400 tracking-widest uppercase mb-4">
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="bg-cyan-400/[0.07] border border-cyan-400/20 text-slate-400 font-mono-custom text-xs px-3 py-1 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <Section id="projects" label="// projects" title="What I've Built">
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className="bg-[#1A2035] border border-slate-800 rounded-xl p-6 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`font-mono-custom text-xs px-2.5 py-1 rounded border ${
                    p.badgeVariant === "cyan"
                      ? "bg-cyan-400/10 border-cyan-400/25 text-cyan-400"
                      : "bg-violet-500/10 border-violet-500/25 text-violet-400"
                  }`}
                >
                  {p.badge}
                </span>
                <span className="font-mono-custom text-xs text-slate-600">{p.year}</span>
              </div>
              <h3 className="font-display font-bold text-slate-100 text-lg mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.stack.map((t) => (
                  <span key={t} className="bg-white/5 text-slate-500 font-mono-custom text-xs px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-cyan-400 text-xs transition-colors group-hover:text-cyan-400"
              >
                ↗ GitHub
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <Section id="experience" label="// experience" title="Where I've Worked">
        <div className="relative pl-6 border-l border-slate-800 space-y-0">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="relative pl-6 pb-10 last:pb-0">
              <span className="absolute -left-[5px] top-[6px] w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.6)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <p className="font-display font-bold text-slate-100 text-base">{e.role}</p>
                <span className="font-mono-custom text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                  {e.period}
                </span>
              </div>
              <p className="text-cyan-400 text-sm font-medium mb-3">{e.company}</p>
              <ul className="space-y-1.5 pl-4 list-disc marker:text-slate-700">
                {e.bullets.map((b, j) => (
                  <li key={j} className="text-slate-400 text-sm leading-relaxed">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <Section id="contact" label="// contact" title="Get In Touch">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Open to full-time roles, freelance projects, and interesting collaborations.
              Whether it&apos;s a startup needing a full stack build, a Web3 project, or a quick
              consultation — let&apos;s talk.
            </p>
            <div className="space-y-3">
              {[
                { icon: "@", label: "jenil@example.com", href: "mailto:jenil@example.com" },
                { icon: "gh", label: "github.com/JenilK04", href: "https://github.com/JenilK04" },
                { icon: "in", label: "linkedin.com/in/jenil-kovadiya", href: "https://linkedin.com/in/jenil-kovadiya" },
                { icon: "fv", label: "Fiverr · Upwork · Contra", href: "#" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 text-sm transition-colors group"
                >
                  <span className="w-9 h-9 border border-slate-700 rounded-lg flex items-center justify-center font-mono-custom text-xs text-cyan-400 flex-shrink-0 group-hover:border-cyan-400 transition-colors">
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>

      <footer className="border-t border-slate-800 text-center py-8 font-mono-custom text-xs text-slate-600">
        Built by <span className="text-cyan-400">Jenil Kovadiya</span> · 2026
      </footer>
    </div>
  );
}

// ─── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    // Replace with your preferred email service (EmailJS, Formspree, etc.)
    console.log("Form submitted:", form);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#1A2035] border border-slate-800 rounded-xl p-6 space-y-4">
      {(["name", "email", "message"] as const).map((field) => (
        <div key={field}>
          <label className="block font-mono-custom text-xs text-slate-500 mb-1.5 tracking-wide">
            {field}
          </label>
          {field === "message" ? (
            <textarea
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              placeholder="What are you building?"
              rows={4}
              className="w-full bg-white/5 border border-slate-700 focus:border-cyan-400 rounded-md px-4 py-2.5 text-slate-200 text-sm outline-none transition-colors resize-y font-sans"
            />
          ) : (
            <input
              type={field === "email" ? "email" : "text"}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              placeholder={field === "email" ? "your@email.com" : "Your name"}
              className="w-full bg-white/5 border border-slate-700 focus:border-cyan-400 rounded-md px-4 py-2.5 text-slate-200 text-sm outline-none transition-colors font-sans"
            />
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="w-full bg-cyan-400 text-[#0A0F1C] font-display font-bold py-3 rounded-md text-sm hover:opacity-85 transition-opacity"
      >
        {sent ? "Message Sent ✓" : "Send Message"}
      </button>
    </div>
  );
}