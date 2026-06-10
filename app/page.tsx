"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface SkillItem { name: string; level: number; icon: React.ReactNode }
interface SkillGroup { cat: string; items: SkillItem[] }
interface Project { title: string; badge: string; badgeVariant: "blue" | "violet"; year: string; desc: string; stack: string[]; link: string }
interface Experience { role: string; company: string; period: string; bullets: string[] }

// ─── Static Asset Icons (Matched to your exact public/ folder filenames) ──────
const Icons = {
  React: () => <img src="/React.svg" alt="React" width={18} height={18} className="object-contain" />,
  Next: () => <img src="/Next.js.svg" alt="Next.js" width={18} height={18} className="object-contain" />, // Fallback if you add Next.svg later
  TypeScript: () => <img src="/TypeScript.svg" alt="TypeScript" width={18} height={18} className="object-contain" />,
  Tailwind: () => <img src="/Tailwind CSS.svg" alt="Tailwind CSS" width={18} height={18} className="object-contain" />,
  Mobile: () => <img src="/React.svg" alt="React Native" width={18} height={18} className="object-contain" />, // Reusing React asset for Native
  Spring: () => <img src="/Spring.svg" alt="Spring Boot" width={18} height={18} className="object-contain" />,
  Java: () => <img src="/Java.svg" alt="Java" width={18} height={18} className="object-contain" />,
  Node: () => <img src="/Node.js.svg" alt="Node.js" width={18} height={18} className="object-contain" />,
  MySQL: () => <img src="/MySQL.svg" alt="MySQL" width={18} height={18} className="object-contain" />, // Matches your truncated filename prefix
  Express: () => <img src="/Express.svg" alt="Express.js" width={18} height={18} className="object-contain" />,
  Postgres: () => <img src="/PostgresSQL.svg" alt="PostgreSQL" width={18} height={18} className="object-contain" />, // Matches your truncated filename prefix
  Mongo: () => <img src="/MongoDB.svg" alt="MongoDB" width={18} height={18} className="object-contain" />,
  Solidity: () => <img src="/Solidity.svg" alt="Solidity" width={18} height={18} className="object-contain" />,
  Hardhat: () => <img src="/Hardhat.svg" alt="Hardhat" width={18} height={18} className="object-contain" />,
  Docker: () => <img src="/Docker.svg" alt="Docker" width={18} height={18} className="object-contain" />,
  AWS: () => <img src="/AWS.svg" alt="AWS" width={18} height={18} className="object-contain" />,
  GhActions: () => <img src="/GitHub.svg" alt="GitHub Actions" width={18} height={18} className="object-contain" />, // Map to your GitHub.svg file
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const ROLES = ["Full Stack Developer","Spring Boot + Next.js","Blockchain / Web3","Real-time Systems","Freelance Dev"];

const SKILL_GROUPS: SkillGroup[] = [
  { cat: "Frontend", items: [
    { name: "React.js",      level: 90, icon: <Icons.React /> },
    { name: "Next.js",       level: 88, icon: <Icons.Next /> },
    { name: "TypeScript",    level: 82, icon: <Icons.TypeScript /> },
    { name: "Tailwind CSS",  level: 90, icon: <Icons.Tailwind /> },
    { name: "React Native",  level: 70, icon: <Icons.Mobile /> },
  ]},
  { cat: "Backend", items: [
    { name: "Spring Boot",   level: 85, icon: <Icons.Spring /> },
    { name: "Java 21",       level: 88, icon: <Icons.Java /> },
    { name: "Node.js",       level: 85, icon: <Icons.Node /> },
    { name: "Express.js",    level: 84, icon: <Icons.Express /> },
  ]},
  { cat: "Database & Cache", items: [
    { name: "PostgreSQL",    level: 80, icon: <Icons.Postgres /> },
    { name: "MongoDB",       level: 82, icon: <Icons.Mongo /> },
    { name: "MySQL",         level: 78, icon: <Icons.MySQL /> },
  ]},
  { cat: "Blockchain", items: [
    { name: "Solidity",      level: 75, icon: <Icons.Solidity /> },

    { name: "Hardhat",       level: 68, icon: <Icons.Hardhat /> },

  ]},
  { cat: "DevOps & Cloud", items: [
    { name: "Docker",          level: 78, icon: <Icons.Docker /> },
    { name: "AWS",             level: 70, icon: <Icons.AWS /> },
    { name: "GitHub Actions",  level: 72, icon: <Icons.GhActions /> },

  ]},
];

const PROJECTS: Project[] = [
  { title: "AuctoWire", badge: "In Progress", badgeVariant: "blue", year: "2026", desc: "India-first live bidding marketplace. Real-time auctions, KYC flows, Redis Lua race condition handling, and a React Native mobile app.", stack: ["Spring Boot","Next.js 14","Redis","PostgreSQL","React Native","Elasticsearch"], link: "https://github.com/JenilK04/AuctoWire" },
  { title: "Blockchain Voting System", badge: "Web3", badgeVariant: "violet", year: "2023", desc: "Decentralized election platform on Ethereum. Smart contracts handle vote casting and tallying — fully transparent, tamper-proof results.", stack: ["Solidity","React.js","MetaMask","Hardhat","Web3.js"], link: "https://github.com/JenilK04/Voting-system-block-chain-" },
  { title: "ROS Real Estate Platform", badge: "Real Estate", badgeVariant: "blue", year: "2024", desc: "Full-featured MERN real estate portal with property listings, search filters, user auth, and admin dashboard. Built at Shivalik Developers.", stack: ["MongoDB","Express.js","React.js","Node.js","AWS S3"], link: "https://github.com/JenilK04/ros" },
  { title: "Online Bidding System", badge: "Real-time", badgeVariant: "violet", year: "2025", desc: "Real-time bidding platform using Socket.IO for live bid updates, countdown timers, and instant notifications. Seed idea behind AuctoWire.", stack: ["Node.js","Socket.IO","Express.js","MongoDB"], link: "https://github.com/JenilK04/Online-Bidding-System" },
];

const EXPERIENCE: Experience[] = [
  { role: "Full Stack Developer Intern", company: "Shivalik Developers, Surat", period: "2025 · 6 months", bullets: ["Built a production-grade MERN real estate platform handling property listings, search, and user management.","Developed a real-time auction module with live bidding, Socket.IO events, and bid history tracking.","Integrated AWS S3 for document and image uploads; implemented JWT-based role authentication.","Delivered features end-to-end — from database schema design to React UI and REST API."] },
  { role: "Freelance Full Stack Developer", company: "Fiverr · Upwork · Contra", period: "2026 – Present", bullets: ["Building client projects across MERN, Java Full Stack, Blockchain/Solidity, and workflow automation.","Audited DeFi real estate smart contracts for a client — identified critical security vulnerabilities.","Active across Fiverr, Upwork, Odesire, and Contra spanning multiple technology stacks."] },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useTypewriter(roles: string[]) {
  const [text, setText] = useState("");
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = roles[ri];
    const delay = del ? 45 : ci === cur.length ? 1800 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const n = ci + 1; setText(cur.slice(0, n));
        if (n === cur.length) setDel(true); else setCi(n);
      } else {
        const n = ci - 1; setText(cur.slice(0, n)); setCi(n);
        if (n === 0) { setDel(false); setRi(i => (i + 1) % roles.length); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [ci, del, ri, roles]);
  return text;
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Section wrapper ───────────────────────────────────────────────────────────
function Section({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  const { ref, visible } = useFadeIn();
  return (
    <section id={id} ref={ref} className={`py-20 px-6 max-w-5xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <p className="font-mono text-xs text-blue-600 tracking-widest mb-1.5">{label}</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-2">{title}</h2>
      <div className="w-10 h-0.5 bg-blue-600 mb-10 rounded" />
      {children}
    </section>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const role = useTypewriter(ROLES);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#FAFAF9] text-slate-900 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Nav */}
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[rgba(250,250,249,0.92)] backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-center">
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {["about","skills","projects","experience","contact"].map(s => (
            <li key={s}><a href={`#${s}`} className="text-slate-500 hover:text-blue-600 text-xs uppercase tracking-widest transition-colors">{s}</a></li>
          ))}
        </ul>
        <button className="md:hidden ml-auto text-slate-500 hover:text-blue-600" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? <path d="M6 6l10 10M16 6l-10 10"/> : <><path d="M4 6h14M4 11h14M4 16h14"/></>}
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-4">
          {["about","skills","projects","experience","contact"].map(s => (
            <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)} className="text-slate-500 hover:text-blue-600 text-sm uppercase tracking-widest">{s}</a>
          ))}
        </div>
      )}

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-32 min-h-screen flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 font-mono text-xs tracking-widest px-3 py-1.5 rounded mb-6 w-fit">
          ~/jenil-kovadiya <span className="inline-block w-0.5 h-3.5 bg-blue-600 blink" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-slate-900 leading-none mb-3">Jenil Kovadiya</h1>
        <p className="font-display text-2xl md:text-3xl font-medium text-blue-600 mb-6 min-h-[2.5rem]">
          {role}<span className="inline-block w-0.5 h-7 bg-blue-600 blink ml-1 translate-y-0.5" />
        </p>
        <p className="text-slate-500 max-w-lg leading-relaxed mb-10 text-sm">
          Full Stack Developer crafting production-grade web apps — from real-time auction systems to blockchain platforms. B.Tech CS &apos;26, P.P. Savani University.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="#projects" className="bg-blue-600 text-white font-display font-bold px-7 py-3 rounded-md text-sm hover:opacity-90 transition-opacity">View Projects</a>
          <a href="#contact" className="border border-slate-300 text-slate-500 font-display px-7 py-3 rounded-md text-sm hover:border-blue-600 hover:text-blue-600 transition-colors">Let&apos;s Talk</a>
        </div>
        <div className="flex gap-10 mt-14 pt-8 border-t border-slate-200">
          {[{num:"6+",label:"Months Professional Exp"},{num:"5+",label:"Projects Shipped"},{num:"8.29",label:"CGPA"}].map(({num,label}) => (
            <div key={label}><p className="font-display text-2xl font-bold text-slate-900">{num}</p><p className="text-xs text-slate-400 tracking-wide mt-0.5">{label}</p></div>
          ))}
        </div>
      </section>

      {/* About */}
      <Section id="about" label="// about" title="Who I Am">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
            <p>I&apos;m a <span className="text-blue-600 font-medium">Full Stack Developer</span> based in Surat, India, specializing in scalable, real-time web platforms. I care about clean architecture, performance, and shipping things that actually work in production.</p>
            <p>My stack spans <span className="text-blue-600 font-medium">Spring Boot, React/Next.js, Node.js</span>, with hands-on experience in <span className="text-blue-600 font-medium">Solidity, Redis, Docker, and AWS</span>. Also active in freelancing — helping clients globally build custom software.</p>
            <p>Currently building <span className="text-blue-600 font-medium">AuctoWire</span>, an India-first live bidding marketplace with real-time bidding, KYC flows, and a React Native mobile app.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            {[
              { icon: "/education-cap.svg", title: "B.Tech Computer Science", sub: "P.P. Savani University · 2022–2026" },
              { icon: "/business-bag.svg", title: "Full Stack Intern", sub: "Shivalik Developers · 6 months" },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex gap-3 items-start">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src={icon} alt={title} width={18} height={18} className="object-contain" />
                </div>
                <div>
                  <p className="font-display font-semibold text-slate-900 text-sm">{title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills (Box Grid with Updated public folder files) */}
      <Section id="skills" label="// skills" title="Tech Stack">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full">
          {SKILL_GROUPS.map(({ cat, items }) => (
            <div key={cat} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <p className="font-display text-xs font-bold text-blue-600 tracking-widest uppercase mb-4 pb-1 border-b border-slate-100">
                  {cat}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {items.map(s => (
                    <div 
                      key={s.name} 
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl select-none hover:border-blue-400/50 hover:bg-white transition-colors duration-200"
                    >
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                        {s.icon}
                      </div>
                      <span className="font-display text-sm font-medium text-slate-800 whitespace-nowrap">
                        {s.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" label="// projects" title="What I've Built">
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map(p => (
            <div key={p.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-1 transition-all duration-200 group">
              <div className="flex justify-between items-center mb-4">
                <span className={`font-mono text-xs px-2.5 py-1 rounded border ${p.badgeVariant === "blue" ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-violet-50 border-violet-200 text-violet-700"}`}>{p.badge}</span>
                <span className="font-mono text-xs text-slate-400">{p.year}</span>
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base mb-2">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.map(t => <span key={t} className="bg-slate-100 text-slate-500 font-mono text-xs px-2 py-0.5 rounded">{t}</span>)}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 text-xs transition-colors group-hover:text-blue-600">↗ GitHub</a>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" label="// experience" title="Where I've Worked">
        <div className="relative pl-6 border-l-2 border-slate-200 space-y-0">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="relative pl-6 pb-10 last:pb-0">
              <span className="absolute -left-[7px] top-[6px] w-3 h-3 rounded-full bg-white border-2 border-blue-600" />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <p className="font-display font-bold text-slate-900 text-base">{e.role}</p>
                <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{e.period}</span>
              </div>
              <p className="text-blue-600 text-sm font-medium mb-3">{e.company}</p>
              <ul className="space-y-1.5 pl-4 list-disc marker:text-slate-300">
                {e.bullets.map((b, j) => <li key={j} className="text-slate-500 text-sm leading-relaxed">{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" label="// contact" title="Get In Touch">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">Open to full-time roles, freelance projects, and interesting collaborations. Whether it&apos;s a startup needing a full stack build, a Web3 project, or a quick consultation — let&apos;s talk.</p>
            <div className="space-y-3">
              {/* Updated Contact Array with your custom image paths and exact links */}
              {[
                { icon: "/Gmail.svg", label: "kovadiyajenil11@gmail.com", href: "mailto:kovadiyajenil11@gmail.com" },
                { icon: "/GitHub.svg", label: "github.com/JenilK04", href: "https://github.com/JenilK04" },
                { icon: "/LinkedIn.svg", label: "linkedin.com/in/jenil-kovadiya", href: "https://www.linkedin.com/in/jenil-kovadiya-482143253/" },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-500 hover:text-blue-600 text-sm transition-colors group">
                  <span className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-blue-400 transition-colors">
                    <img src={icon} alt={label} width={16} height={16} className="object-contain" />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-slate-200 text-center py-8 font-mono text-xs text-slate-400">
        Built by <span className="text-blue-600">Jenil Kovadiya</span> · 2026
      </footer>
    </div>
  );
}
