"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Layers,  
  Atom,  
  Send, 
  ArrowRight,  
  Activity, 
  CheckCircle2, 
  Server, 
  Database,
  ArrowUpRight,
} from "lucide-react";

// --- Typewriter Segment Interface ---
interface Segment {
  text: string;
  className: string;
}

// --- Typewriter Component ---
function TypewriterText({ 
  segments, 
  speed = 50, 
  delay = 0, 
  cursorColor = "bg-accent-chartreuse" 
}: { 
  segments: Segment[]; 
  speed?: number; 
  delay?: number; 
  cursorColor?: string; 
 }) {
  const [charIndex, setCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const chars: { char: string; className: string }[] = [];
  segments.forEach((seg) => {
    for (let i = 0; i < seg.text.length; i++) {
      chars.push({ char: seg.text[i], className: seg.className });
    }
  });

  useEffect(() => {
    const startTimeout = setTimeout(() => setIsStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;
    let timeout: NodeJS.Timeout;
    if (charIndex < chars.length) {
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isStarted, chars.length, speed]);

  return (
    <>
      {chars.slice(0, charIndex).map((c, i) => (
        <span key={i} className={c.className}>{c.char}</span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className={`inline-block w-[0.2em] h-[0.9em] align-middle ml-1.5 ${cursorColor}`}
        style={{ marginBottom: '0.1em' }}
      />
    </>
  );
}

// --- Animated Stats Counter Component ---
function Counter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [count, setCount] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse the numeric part and non-numeric suffixes (e.g., "5+", "<1s", "40%")
    const numericPart = value.replace(/[^0-9]/g, "");
    const suffix = value.replace(/[0-9]/g, "");
    
    if (!numericPart) {
      setCount(value);
      return;
    }

    const targetVal = parseInt(numericPart, 10);
    let start = 0;
    const increment = targetVal / (duration * 60); // 60 FPS
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetVal) {
        clearInterval(timer);
        // Include prefix/suffix placing correctly
        if (value.startsWith("<")) {
          setCount(`<${targetVal}${suffix.replace("<", "")}`);
        } else {
          setCount(`${targetVal}${suffix}`);
        }
      } else {
        const currentRounded = Math.floor(current);
        if (value.startsWith("<")) {
          setCount(`<${currentRounded}${suffix.replace("<", "")}`);
        } else {
          setCount(`${currentRounded}${suffix}`);
        }
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count || value}</span>;
}

// --- Dynamic Project Interface ---
interface Project {
  id: string;
  category: "ai" | "fullstack" | "backend" | "opensource";
  title: string;
  type: string;
  desc: string;
  metrics?: { val: string; lbl: string }[];
  tags: { text: string; theme?: "blue" | "orange" | "chartreuse" }[];
  featured?: boolean;
  featuredStat?: string;
  featuredStatLbl?: string;
  featuredDetail?: string;
  bullets?: string[];
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });
  
  // Interactive Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Scroll lock when project modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
  };

  // --- Project Data ---
  const projects: Project[] = [
    {
      id: "walmart-cms",
      category: "backend",
      title: "Walmart Virtual Store CMS",
      type: "CMS · 3D Commerce",
      desc: "A backend CMS powering a mobile app for virtual stores, enabling custom themes, 3D product placements, multi-step approval workflows, and GCP deployments.",
      bullets: [
        "Built a CMS backend powering a mobile app for creating virtual stores with custom themes, layouts, and 3D product placements.",
        "Developed a multi-step product digitalization and approval workflow (manual entry, bundle uploads, Walmart API validation, 3D model integration, publishing/ unpublishing).",
        "Implemented admin/ reviewer workflows, role-based permission management, and automated notifications for store/ product approvals.",
        "Set up CI/ CD pipelines on GCP (bucket + CDN + load balancer) to streamline deployments and optimize frontend performance."
      ],
      metrics: [
        { val: "3D", lbl: "Digitalization" },
        { val: "GCP", lbl: "Deployments" },
        { val: "Multi", lbl: "Role Approvals" }
      ],
      tags: [
        { text: "TypeScript" },
        { text: "ASP.Net Core" },
        { text: "PostgreSQL" },
        { text: "Firebase" },
        { text: "Stripe", theme: "blue" },
        { text: "GCP", theme: "orange" }
      ]
    },
    {
      id: "emperia",
      category: "fullstack",
      title: "Emperia QuickStitch Dashboard",
      type: "Full Stack · SaaS",
      desc: "A dashboard for rendering and managing 3D virtual worlds via JSON config uploads. Multi-org management, per-tier bandwidth allocation, and Stripe subscriptions.",
      bullets: [
        "Enhanced a dashboard that lets users render and manage 3D virtual worlds by uploading JSON configurations, supporting multi-organization management with individual subscriptions.",
        "Implemented dynamic plan management to allocate bandwidth and storage per subscription tier, with real-time usage alerts.",
        "Integrated Stripe for secure payments and seamless plan upgrades.",
        "Built the Community Experience feature, enabling users to share, explore, and engage with others' virtual experiences.",
        "Collaborated on a scalable backend (DRF, Postgres) deployed on AWS EC2, with usage tracking via M3ter."
      ],
      tags: [
        { text: "React" },
        { text: "TypeScript" },
        { text: "Django REST" },
        { text: "Stripe", theme: "blue" },
        { text: "AWS EC2", theme: "blue" },
        { text: "PostgreSQL" },
        { text: "M3ter", theme: "orange" }
      ],
      featured: true,
      featuredStat: "3D",
      featuredStatLbl: "Virtual World Management",
      featuredDetail: "Multi-org · Stripe · Real-time alerts"
    },
    {
      id: "directed-ira",
      category: "fullstack",
      title: "Directed IRA Platform",
      type: "Fintech · Security",
      desc: "Secure self-directed IRA platform with OWASP-hardened backend, Alloy identity verification, CSRF/XSS protection, and scalable user-facing investment workflows.",
      bullets: [
        "Contributed to the development of a secure, scalable self-directed IRA platform enabling users to manage alternative investments with regulatory compliance.",
        "Improved overall platform security by approximately 40% by implementing OWASP best practices, including secure authentication, authorization, and data protection mechanisms.",
        "Integrated Alloy identity verification to reduce fraudulent and spam account creation by 15%, resulting in a 10% decrease in suspicious activities.",
        "Strengthened backend and server security by implementing CSRF and XSS protection, HTTP security headers (Helmet), session management, and secure cookies.",
        "Designed and implemented new user-facing forms and backend workflows, contributing to a 20% improvement in system scalability and performance."
      ],
      metrics: [
        { val: "40%", lbl: "security boost" },
        { val: "15%", lbl: "fraud reduction" },
        { val: "20%", lbl: "perf gain" }
      ],
      tags: [
        { text: "React" },
        { text: "NestJS" },
        { text: "PostgreSQL", theme: "blue" },
        { text: "AWS", theme: "orange" },
        { text: "Datadog" }
      ]
    },
    {
      id: "dark-weather",
      category: "ai",
      title: "Dark Weather — AI Weather App",
      type: "AI · Python",
      desc: "Async-first weather app with an agentic AI assistant using OpenAI SDK + vector DB for persistent conversational context. Response time cut from 2–3s to under 1s.",
      bullets: [
        "Optimized infrastructure of a weather application by converting APIs and server to asynchronous, reducing response time from 2-3 seconds to under 1 second.",
        "Built a fully optimized AI Weather Assistant using the OpenAI SDK and vector databases to maintain personalized conversational context.",
        "Implemented an agentic architecture, defining specialized tools to dynamically handle user prompts and provide accurate weather, air quality, and alert information.",
        "Revamped the legacy weather UI into a modern, responsive interface using React and TailwindCSS, improving usability and visual appeal."
      ],
      metrics: [
        { val: "<1s", lbl: "response time" },
        { val: "Agent", lbl: "AI Assist" },
        { val: "Async", lbl: "API Engine" }
      ],
      tags: [
        { text: "Python" },
        { text: "Django DRF" },
        { text: "OpenAI SDK", theme: "blue" },
        { text: "Qdrant", theme: "blue" },
        { text: "React" }
      ]
    },
    {
      id: "hai-sensei",
      category: "ai",
      title: "Hai-Sensei — LLM Workflow System",
      type: "AI · LLM Orchestration",
      desc: "AI backend that transforms meeting transcripts into structured behavioral analysis reports through a 20–27 stage prompt chain. Built for accuracy, continuity, and scale.",
      bullets: [
        "Developed an AI-powered backend in NestJS to generate behavioral reports from meeting transcripts using chained LLM workflows engine.",
        "Developed an AI-powered backend system for generating behavioral analysis reports from meeting transcripts through multi-step LLM workflows.",
        "Designed and orchestrated 20–27 prompt-driven AI workflow stages, where each step produced structured JSON responses consumed by subsequent stages.",
        "Implemented contextual prompt chaining to improve response accuracy, workflow continuity, and report quality.",
        "Built scalable backend services for transcript processing, workflow execution, and AI-generated behavioral insights.",
        "Optimized data flow and structured output handling for reliable AI report generation.",
        "Collaborated on an AI-driven analytics platform focused on extracting actionable behavioral intelligence from conversations and meetings."
      ],
      tags: [
        { text: "TypeScript" },
        { text: "NestJS" },
        { text: "LLM Chaining", theme: "blue" },
        { text: "PostgreSQL", theme: "blue" },
        { text: "AWS", theme: "orange" }
      ],
      featured: true,
      featuredStat: "27",
      featuredStatLbl: "Chained LLM Workflow Stages",
      featuredDetail: "Structured JSON · Behavioral AI · Meetings"
    }
  ];

  // Filters projects based on selected active category tab
  const filteredProjects = projects.filter(proj => {
    if (activeFilter === "All") return true;
    if (activeFilter === "AI / ML") return proj.category === "ai";
    if (activeFilter === "Full Stack") return proj.category === "fullstack";
    if (activeFilter === "Backend") return proj.category === "backend";
    if (activeFilter === "Open Source") return proj.category === "opensource";
    return true;
  });

  // Handles form inputs updates
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Submits form with mock/interactive timing
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormFeedback({ type: "error", msg: "Please fill out all fields." });
      return;
    }

    setIsSubmitting(true);
    setFormFeedback({ type: null, msg: "" });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormFeedback({
        type: "success",
        msg: "Message sent successfully! Zohaib will get back to you shortly."
      });
      setFormState({ name: "", email: "", message: "" });
    }, 1800);
  };

  return (
    <main className="md:ml-20 min-h-screen relative overflow-hidden bg-bg-dark">
      <section 
        className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-16 max-w-[1200px] mx-auto relative z-10 overflow-hidden" 
        id="hero"
      >

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative z-10"
        >
          {/* Hero Content */}
          <motion.div variants={revealVariants} className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-tag-bg border border-accent-chartreuse/20 rounded-full mb-6 glow-chartreuse transition-shadow duration-500">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-chartreuse animate-pulse shadow-[0_0_8px_#C8F05A]"></span>
              <span className="font-code-sm text-[11px] tracking-[0.08em] font-medium text-accent-chartreuse uppercase">
                available for new opportunities
              </span>
            </div>

            <h1 className="font-display-lg text-[44px] sm:text-[62px] lg:text-[72px] font-extrabold tracking-tight leading-[1.05] uppercase text-text-primary mb-6">
              Muhammad <br />
              <span className="text-accent-chartreuse drop-shadow-[0_0_15px_rgba(200,240,90,0.15)] select-text">
                Zohaib Zahid
              </span>
            </h1>

            <div className="font-code-sm text-[14px] text-text-muted mb-6 tracking-wide flex items-center gap-2">
              <span className="text-accent-chartreuse font-bold">◇</span>
              <span>Full-Stack AI Engineer · 5+ yrs · Lahore, PK</span>
            </div>

            <p className="font-body-base text-[17px] md:text-[18px] text-text-muted font-light leading-relaxed max-w-[540px] mb-8">
              I build the intelligence layer — from scalable full-stack systems to LLM pipelines and agentic AI. Production-grade, always.
            </p>

            <div className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto">
              <a 
                href="#work" 
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent-chartreuse text-bg-dark font-display-lg font-bold text-[14px] rounded hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-[0_4px_20px_rgba(200,240,90,0.25)] glow-chartreuse w-full sm:w-auto text-center"
              >
                view projects <ArrowRight size={15} />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent text-text-primary border border-border-medium font-display-lg font-bold text-[14px] rounded hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto text-center"
              >
                get in touch
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/Malik-Zohaib-Debug" 
                target="_blank" 
                rel="noreferrer"
                className="font-code-sm text-[12px] text-text-muted hover:text-text-primary border-b border-transparent hover:border-text-primary transition-all duration-300 pb-0.5 flex items-center gap-1.5 group"
              >
                <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub
              </a>
              <a 
                href="https://linkedin.com/in/zohaib-zahid-malik" 
                target="_blank" 
                rel="noreferrer"
                className="font-code-sm text-[12px] text-text-muted hover:text-text-primary border-b border-transparent hover:border-text-primary transition-all duration-300 pb-0.5 flex items-center gap-1.5 group"
              >
                <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn
              </a>
              <a 
                href="mailto:malikzohaibzahid78@gmail.com" 
                className="font-code-sm text-[12px] text-text-muted hover:text-text-primary border-b border-transparent hover:border-text-primary transition-all duration-300 pb-0.5 flex items-center gap-1.5 group"
              >
                <svg className="w-3.5 h-3.5 stroke-current fill-none group-hover:scale-110 transition-transform" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> Email
              </a>
            </div>
          </motion.div>

          {/* Engineer Status Card */}
          <motion.div variants={revealVariants} className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-chartreuse/10 via-transparent to-accent-purple/10 rounded-lg blur-[20px] opacity-70"></div>
            
            <div className="glass-panel p-6 sm:p-8 rounded-lg relative overflow-hidden border border-border-medium shadow-2xl group hover:border-accent-chartreuse/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-chartreuse/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent-chartreuse/10 transition-colors"></div>
              
              {/* Card Annotation Badges */}
              <div className="absolute -top-1 right-8 bg-[#1A1A2E] border border-dashed border-accent-purple text-accent-purple font-code-sm text-[9px] px-2.5 py-0.5 rounded shadow-lg tracking-wider uppercase">
                status card
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-border-dim mb-6">
                <span className="font-code-sm text-[10px] text-text-muted tracking-[0.12em] uppercase">
                  engineer_status
                </span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-chartreuse opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-chartreuse"></span>
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end pb-3 border-b border-border-dim group/row">
                  <span className="text-[13px] text-text-muted group-hover/row:text-text-primary transition-colors">Experience</span>
                  <span className="font-display-lg font-bold text-[16px] text-accent-chartreuse drop-shadow-[0_0_8px_rgba(200,240,90,0.2)]">
                    <Counter value="5+ years" />
                  </span>
                </div>

                <div className="flex justify-between items-end pb-3 border-b border-border-dim group/row">
                  <span className="text-[13px] text-text-muted group-hover/row:text-text-primary transition-colors">Current Role</span>
                  <span className="font-body-base text-[13px] text-text-primary font-medium">
                    SWE @ Directed Trust
                  </span>
                </div>

                <div className="flex justify-between items-end pb-3 border-b border-border-dim group/row">
                  <span className="text-[13px] text-text-muted group-hover/row:text-text-primary transition-colors">Location</span>
                  <span className="font-body-base text-[13px] text-text-primary font-medium">
                    Lahore, PK · Remote
                  </span>
                </div>

                <div className="flex justify-between items-end pb-3 border-b border-border-dim group/row">
                  <span className="text-[13px] text-text-muted group-hover/row:text-text-primary transition-colors">Focus</span>
                  <span className="font-display-lg font-bold text-[14px] text-text-primary">
                    AI/ML · Full Stack
                  </span>
                </div>

                <div className="flex justify-between items-end group/row">
                  <span className="text-[13px] text-text-muted group-hover/row:text-text-primary transition-colors">Status</span>
                  <span className="font-code-sm text-[12px] text-accent-chartreuse font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-chartreuse animate-pulse"></span>
                    open to work
                  </span>
                </div>
              </div>
            </div>

            {/* Micro IDE terminal overlay code snippet */}
            <div className="absolute -bottom-10 -left-6 hidden lg:block w-72 glass-panel p-4 rounded border border-border-medium shadow-2xl font-code-sm text-[10px] leading-relaxed select-none pointer-events-none">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/20"></div>
              </div>
              <TypewriterText 
                segments={[
                  { text: "const ", className: "text-purple-400" },
                  { text: "engineer = {\n  role: ", className: "text-text-primary" },
                  { text: "'AI Engineer'", className: "text-accent-chartreuse" },
                  { text: ",\n  stack: [", className: "text-text-primary" },
                  { text: "'Next.js'", className: "text-accent-purple" },
                  { text: ", ", className: "text-text-primary" },
                  { text: "'LangChain'", className: "text-accent-purple" },
                  { text: "],\n  status: ", className: "text-text-primary" },
                  { text: "'Deploying...'", className: "text-accent-orange" },
                  { text: "\n};", className: "text-text-primary" }
                ]}
                speed={25}
                delay={1500}
                cursorColor="bg-accent-chartreuse"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== MARQUEE BANNER ==================== */}
      <div className="w-full border-t border-b border-border-dim py-5 overflow-hidden bg-bg-secondary relative z-20 shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
        <div className="marquee-inner">
          {[1, 2].map((loopIdx) => (
            <div key={loopIdx} className="flex gap-8 items-center">
              {[
                "React", "TypeScript", "Next.js", "NestJS", "Python", 
                "LangChain", "OpenAI SDK", "PostgreSQL", "AWS", 
                "Docker", "YOLOv11", "PyTorch", "Agentic AI"
              ].map((tech, techIdx) => (
                <div key={techIdx} className="flex items-center gap-8">
                  <span className="font-code-sm text-[12px] tracking-[0.08em] font-medium text-text-muted hover:text-accent-chartreuse transition-colors uppercase">
                    {tech}
                  </span>
                  <span className="text-border-medium font-bold text-[10px]">◆</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ==================== ABOUT SECTION ==================== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto relative z-10" id="about">
        <div className="section-eyebrow">01 — about</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 flex flex-col">
            <h2 className="font-display-lg text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold text-text-primary leading-[1.1] mb-8 uppercase">
              I don&#39;t just build features.<br />
              <span className="text-accent-chartreuse">I engineer systems.</span>
            </h2>
            <div className="space-y-6 font-body-base text-[16px] text-text-muted font-light leading-relaxed max-w-[620px]">
              <p>
                Five years building software that actually ships — from responsive React frontends to backend architectures handling real production load. My work sits at the intersection of <strong className="text-text-primary font-semibold">full-stack engineering</strong> and <strong className="text-accent-chartreuse font-semibold">applied AI</strong>.
              </p>
              <p>
                I care about the code that comes after mine: typed, documented, built for the engineer who inherits it. Whether it&#39;s an LLM workflow system, a 3D virtual store CMS, or a fintech compliance platform — I treat every system as if it has to outlive me.
              </p>
              <p>
                Currently at <strong className="text-text-primary font-medium">Directed Trust Co.</strong> in Phoenix (remote), building a secure IRA platform. Previously at <strong className="text-text-primary font-medium">Geekybugs</strong>, where I led frontend architecture and delivered production AI features.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded border border-border-dim group card-hover-effect hover:border-accent-chartreuse/30">
                <div className="font-display-lg font-extrabold text-[42px] text-accent-chartreuse leading-none mb-2">
                  <Counter value="5+" />
                </div>
                <div className="text-[13px] text-text-muted font-light group-hover:text-text-primary transition-colors">
                  Years in production
                </div>
              </div>

              <div className="glass-panel p-6 rounded border border-border-dim group card-hover-effect hover:border-accent-purple/30">
                <div className="font-display-lg font-extrabold text-[42px] text-accent-purple leading-none mb-2">
                  <Counter value="40%" />
                </div>
                <div className="text-[13px] text-text-muted font-light group-hover:text-text-primary transition-colors">
                  Security boost (Directed IRA)
                </div>
              </div>

              <div className="glass-panel p-6 rounded border border-border-dim group card-hover-effect hover:border-accent-orange/30">
                <div className="font-display-lg font-extrabold text-[42px] text-accent-orange leading-none mb-2">
                  <Counter value="20+" />
                </div>
                <div className="text-[13px] text-text-muted font-light group-hover:text-text-primary transition-colors">
                  AI stages (Hai-Sensei)
                </div>
              </div>

              <div className="glass-panel p-6 rounded border border-border-dim group card-hover-effect hover:border-accent-chartreuse/30">
                <div className="font-display-lg font-extrabold text-[42px] text-accent-chartreuse leading-none mb-2">
                  <Counter value="<1s" />
                </div>
                <div className="text-[13px] text-text-muted font-light group-hover:text-text-primary transition-colors">
                  API response (Dark Weather)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-border-dim max-w-[1200px] mx-auto" />

      {/* ==================== PROJECTS WORK SECTION ==================== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto relative z-10" id="work">
        <div className="section-eyebrow">02 — selected work</div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display-lg text-[36px] sm:text-[48px] font-extrabold text-text-primary leading-none uppercase mb-4">
              Projects
            </h2>
            <p className="font-body-base text-[16px] text-text-muted font-light max-w-[540px]">
              Real systems, shipped to production. Click any card to explore full highlights.
            </p>
          </div>

          {/* Filtering Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {["All", "AI / ML", "Full Stack", "Backend", "Open Source"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4.5 py-1.5 rounded-full font-code-sm text-[12px] border transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? "bg-tag-bg border-accent-chartreuse/40 text-accent-chartreuse font-medium shadow-[0_0_12px_rgba(200,240,90,0.15)]"
                    : "bg-transparent border-border-medium text-text-muted hover:border-text-primary hover:text-text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid with AnimatePresence */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => {
              if (proj.featured) {
                // Wide span featured card
                return (
                  <motion.div
                    layout
                    key={proj.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedProject(proj)}
                    className="col-span-1 md:col-span-2 glass-panel p-6 sm:p-8 rounded-lg relative overflow-hidden border border-border-dim group card-hover-effect hover:border-accent-chartreuse/60 transition-all duration-300 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch cursor-pointer"
                  >
                    {/* Top border glow reveal on card hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent-chartreuse transform scale-x-0 group-hover:scale-x-100 transform-origin-left transition-transform duration-500"></div>
                    
                    <div className="absolute -top-1 right-8 bg-[#1A1A2E] border border-dashed border-accent-chartreuse text-accent-chartreuse font-code-sm text-[9px] px-2.5 py-0.5 rounded shadow-lg tracking-wider uppercase">
                      featured / click to expand
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-code-sm text-[10px] text-text-muted tracking-[0.1em] uppercase">
                            {proj.type}
                          </span>
                          <span className="text-text-muted group-hover:text-accent-chartreuse transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-0.5 duration-300">
                            <ArrowUpRight size={18} />
                          </span>
                        </div>
                        <h3 className="font-display-lg font-bold text-[22px] sm:text-[24px] text-text-primary group-hover:text-accent-chartreuse transition-colors mb-3">
                          {proj.title}
                        </h3>
                        <p className="font-body-base text-[14px] text-text-muted font-light leading-relaxed mb-6">
                          {proj.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((tag, tagIdx) => (
                          <span 
                            key={tagIdx} 
                            className={`px-2.5 py-1 rounded text-[11px] font-code-sm tracking-wider ${
                              tag.theme === "blue" 
                                ? "bg-accent-purple/10 text-[#A89FFF]" 
                                : tag.theme === "orange"
                                ? "bg-accent-orange/10 text-[#FF9D78]"
                                : "bg-tag-bg text-accent-chartreuse"
                            }`}
                          >
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-bg-tertiary border border-border-dim rounded flex items-center justify-center p-6 text-center relative overflow-hidden group-hover:border-accent-chartreuse/25 transition-all">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-chartreuse/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="font-display-lg font-extrabold text-[56px] text-accent-chartreuse leading-none drop-shadow-[0_0_15px_rgba(200,240,90,0.15)] mb-2">
                          {proj.featuredStat}
                        </div>
                        <div className="text-[13px] text-text-primary font-semibold tracking-wide">
                          {proj.featuredStatLbl}
                        </div>
                        <div className="font-code-sm text-[11px] text-text-muted mt-3">
                          {proj.featuredDetail}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              } else {
                // Standard grid card
                return (
                  <motion.div
                    layout
                    key={proj.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedProject(proj)}
                    className="glass-panel p-6 sm:p-8 rounded-lg relative overflow-hidden border border-border-dim group card-hover-effect hover:border-accent-chartreuse/60 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Top border glow reveal on card hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent-chartreuse transform scale-x-0 group-hover:scale-x-100 transform-origin-left transition-transform duration-500"></div>
                    
                    <div className="absolute -top-1 right-8 bg-[#1A1A2E] border border-dashed border-accent-purple text-accent-purple font-code-sm text-[9px] px-2.5 py-0.5 rounded shadow-lg tracking-wider uppercase">
                      click to expand
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-code-sm text-[10px] text-text-muted tracking-[0.1em] uppercase">
                          {proj.type}
                        </span>
                        <span className="text-text-muted group-hover:text-accent-chartreuse transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-0.5 duration-300">
                          <ArrowUpRight size={18} />
                        </span>
                      </div>
                      
                      <h3 className="font-display-lg font-bold text-[20px] text-text-primary group-hover:text-accent-chartreuse transition-colors mb-3">
                        {proj.title}
                      </h3>
                      
                      <p className="font-body-base text-[14px] text-text-muted font-light leading-relaxed mb-6">
                        {proj.desc}
                      </p>
                    </div>

                    <div>
                      {/* Optional metric blocks */}
                      {proj.metrics && proj.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 border-t border-b border-border-dim py-4 mb-6">
                          {proj.metrics.slice(0, 3).map((metric, mIdx) => (
                            <div key={mIdx} className="flex flex-col">
                              <span className="font-display-lg font-bold text-[18px] text-accent-chartreuse leading-none mb-1">
                                {metric.val}
                              </span>
                              <span className="text-[11px] text-text-muted leading-tight">
                                {metric.lbl}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((tag, tagIdx) => (
                          <span 
                            key={tagIdx} 
                            className={`px-2.5 py-1 rounded text-[11px] font-code-sm tracking-wider ${
                              tag.theme === "blue" 
                                ? "bg-accent-purple/10 text-[#A89FFF]" 
                                : tag.theme === "orange"
                                ? "bg-accent-orange/10 text-[#FF9D78]"
                                : "bg-tag-bg text-accent-chartreuse"
                            }`}
                          >
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              }
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <hr className="border-t border-border-dim max-w-[1200px] mx-auto" />

      {/* ==================== EXPERIENCE (TIMELINE) SECTION ==================== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto relative z-10" id="experience">
        <div className="section-eyebrow">03 — experience</div>
        
        <h2 className="font-display-lg text-[36px] sm:text-[48px] font-extrabold text-text-primary leading-none uppercase mb-16">
          Career Path
        </h2>

        <div className="relative pl-0 md:pl-32 flex flex-col gap-0 border-l border-border-dim">
          
          {/* Position Node 1 */}
          <div className="relative pb-16 pl-6 md:pl-10 group">
            {/* Pulsing tree node connector indicator */}
            <span className="absolute -left-[5.5px] top-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-chartreuse opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-chartreuse shadow-[0_0_8px_#C8F05A]"></span>
            </span>

            {/* Float dates on the left on desktop */}
            <div className="absolute left-[-150px] top-1.5 hidden md:block font-code-sm text-[12px] text-text-muted w-[120px] text-right font-medium">
              09/2025 – Present
            </div>

            {/* Mobile / fallback dates */}
            <div className="block md:hidden font-code-sm text-[11px] text-accent-chartreuse font-medium mb-2">
              09/2025 – Present
            </div>

            <div className="flex flex-col items-start">
              <div className="font-code-sm text-[11px] tracking-widest text-accent-chartreuse uppercase mb-1 font-semibold">
                Directed Trust Company · Phoenix, AZ (Remote)
              </div>
              <h3 className="font-display-lg font-bold text-[22px] text-text-primary group-hover:text-accent-chartreuse transition-colors mb-4">
                Software Engineer
              </h3>
              
              <ul className="space-y-2.5 max-w-[760px] font-body-base text-[14px] text-text-muted font-light mb-6 list-none">
                <li className="pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-accent-chartreuse font-bold">→</span>
                  Built a secure, scalable self-directed IRA platform enabling users to manage alternative investments with regulatory compliance.
                </li>
                <li className="pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-accent-chartreuse font-bold">→</span>
                  Improved platform security ~40% via OWASP hardening — auth, authorization, and data protection.
                </li>
                <li className="pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-accent-chartreuse font-bold">→</span>
                  Integrated Alloy identity verification, cutting fraudulent account creation by 15%.
                </li>
                <li className="pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-accent-chartreuse font-bold">→</span>
                  Implemented CSRF/XSS protection, Helmet headers, session management, and secure cookies.
                </li>
              </ul>

              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "NestJS", "PostgreSQL", "AWS", "Datadog", "Stripe"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-white/5 border border-border-dim rounded text-[11px] font-code-sm text-text-muted tracking-wide group-hover:border-accent-chartreuse/20 transition-all">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Position Node 2 */}
          <div className="relative pb-16 pl-6 md:pl-10 group">
            {/* Node circle */}
            <span className="absolute -left-[4.5px] top-1.5 w-[9px] h-[9px] bg-border-medium rounded-full group-hover:bg-accent-purple shadow-sm transition-colors duration-300"></span>

            {/* Float dates on the left on desktop */}
            <div className="absolute left-[-150px] top-1.5 hidden md:block font-code-sm text-[12px] text-text-muted w-[120px] text-right font-medium">
              08/2022 – 09/2025
            </div>

            {/* Mobile / fallback dates */}
            <div className="block md:hidden font-code-sm text-[11px] text-accent-purple font-medium mb-2">
              08/2022 – 09/2025
            </div>

            <div className="flex flex-col items-start">
              <div className="font-code-sm text-[11px] tracking-widest text-accent-purple uppercase mb-1 font-semibold">
                Geekybugs · Lahore, Pakistan
              </div>
              <h3 className="font-display-lg font-bold text-[22px] text-text-primary group-hover:text-accent-purple transition-colors mb-4">
                Associate Software Engineer
              </h3>
              
              <ul className="space-y-2.5 max-w-[760px] font-body-base text-[14px] text-text-muted font-light mb-6 list-none">
                <li className="pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-accent-purple font-bold">→</span>
                  Optimized application performance across frontend and backend — refactoring, state management, best practices.
                </li>
                <li className="pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-accent-purple font-bold">→</span>
                  Delivered pixel-perfect web apps migrated from legacy frontend views.
                </li>
                <li className="pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-accent-purple font-bold">→</span>
                  Designed and consumed REST APIs with seamless frontend integration.
                </li>
                <li className="pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-accent-purple font-bold">→</span>
                  Mentored junior interns and participated in code reviews and architecture discussions.
                </li>
              </ul>

              <div className="flex flex-wrap gap-2">
                {["React", "Django DRF", "PostgreSQL", "AWS", "Docker"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-white/5 border border-border-dim rounded text-[11px] font-code-sm text-text-muted tracking-wide group-hover:border-accent-purple/20 transition-all">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Position Node 3 */}
          <div className="relative pl-6 md:pl-10 group">
            {/* Node circle */}
            <span className="absolute -left-[4.5px] top-1.5 w-[9px] h-[9px] bg-border-medium rounded-full group-hover:bg-accent-orange shadow-sm transition-colors duration-300"></span>

            {/* Float dates on the left on desktop */}
            <div className="absolute left-[-150px] top-1.5 hidden md:block font-code-sm text-[12px] text-text-muted w-[120px] text-right font-medium">
              10/2019 – 07/2023
            </div>

            {/* Mobile / fallback dates */}
            <div className="block md:hidden font-code-sm text-[11px] text-accent-orange font-medium mb-2">
              10/2019 – 07/2023
            </div>

            <div className="flex flex-col items-start">
              <div className="font-code-sm text-[11px] tracking-widest text-accent-orange uppercase mb-1 font-semibold">
                University of Management and Technology
              </div>
              <h3 className="font-display-lg font-bold text-[22px] text-text-primary group-hover:text-accent-orange transition-colors mb-4">
                B.Sc. Software Engineering
              </h3>
              
              <p className="font-body-base text-[14px] text-text-muted font-light leading-relaxed max-w-[760px]">
                Coursework: Object Oriented Programming, Data Structures &amp; Algorithms, Database Systems, Machine Learning, Deep Learning, and Information Security.
              </p>
            </div>
          </div>

        </div>
      </section>

      <hr className="border-t border-border-dim max-w-[1200px] mx-auto" />

      {/* ==================== SKILLS (TECH STACK) SECTION ==================== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto relative z-10" id="skills">
        <div className="section-eyebrow">04 — capabilities</div>
        
        <h2 className="font-display-lg text-[36px] sm:text-[48px] font-extrabold text-text-primary leading-none uppercase mb-4">
          Tech Stack
        </h2>
        <p className="font-body-base text-[16px] text-text-muted font-light mb-16 max-w-[540px]">
          What I actually use in production — not just a buzzword list.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Group 1: Frontend */}
          <div className="glass-panel p-6 rounded border border-border-dim group hover:border-accent-chartreuse/30 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Atom size={18} className="text-accent-chartreuse animate-spin-slow" />
              <h3 className="font-display-lg font-bold text-[16px] text-text-primary">
                Frontend
              </h3>
            </div>
            <div className="text-[12px] text-text-muted font-light mb-5">
              Interfaces that feel native
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"].map((s) => (
                <span key={s} className="px-2 py-0.5.5 bg-tag-bg text-accent-chartreuse font-code-sm text-[11px] tracking-wider rounded border border-accent-chartreuse/10 group-hover:border-accent-chartreuse/25 transition-all">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Group 2: Backend */}
          <div className="glass-panel p-6 rounded border border-border-dim group hover:border-accent-purple/30 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Server size={18} className="text-accent-purple" />
              <h3 className="font-display-lg font-bold text-[16px] text-text-primary">
                Backend
              </h3>
            </div>
            <div className="text-[12px] text-text-muted font-light mb-5">
              APIs that scale
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["NestJS", "Node.js", "Express", "Django DRF", "ASP.Net"].map((s) => (
                <span key={s} className="px-2 py-0.5 bg-accent-purple/5 text-[#A89FFF] font-code-sm text-[11px] tracking-wider rounded border border-accent-purple/10 group-hover:border-accent-purple/25 transition-all">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Group 3: AI / ML */}
          <div className="glass-panel p-6 rounded border border-border-dim group hover:border-accent-orange/30 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Cpu size={18} className="text-accent-orange" />
              <h3 className="font-display-lg font-bold text-[16px] text-text-primary">
                AI / ML
              </h3>
            </div>
            <div className="text-[12px] text-text-muted font-light mb-5">
              Intelligent systems
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["LangChain", "OpenAI SDK", "Agentic AI", "YOLOv11", "PyTorch", "HuggingFace"].map((s) => (
                <span key={s} className="px-2 py-0.5 bg-accent-orange/5 text-[#FF9D78] font-code-sm text-[11px] tracking-wider rounded border border-accent-orange/10 group-hover:border-accent-orange/25 transition-all">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Group 4: Data */}
          <div className="glass-panel p-6 rounded border border-border-dim group hover:border-accent-chartreuse/30 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Database size={18} className="text-accent-chartreuse" />
              <h3 className="font-display-lg font-bold text-[16px] text-text-primary">
                Data
              </h3>
            </div>
            <div className="text-[12px] text-text-muted font-light mb-5">
              Storage &amp; persistence
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["PostgreSQL", "MongoDB", "Redis", "Firebase", "Qdrant"].map((s) => (
                <span key={s} className="px-2 py-0.5 bg-tag-bg text-accent-chartreuse font-code-sm text-[11px] tracking-wider rounded border border-accent-chartreuse/10 group-hover:border-accent-chartreuse/25 transition-all">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Group 5: Infrastructure */}
          <div className="glass-panel p-6 rounded border border-border-dim group hover:border-accent-purple/30 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={18} className="text-accent-purple" />
              <h3 className="font-display-lg font-bold text-[16px] text-text-primary">
                Infrastructure
              </h3>
            </div>
            <div className="text-[12px] text-text-muted font-light mb-5">
              Ship and scale
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["AWS S3/EC2", "GCP", "Docker", "CI/CD", "Nginx"].map((s) => (
                <span key={s} className="px-2 py-0.5 bg-accent-purple/5 text-[#A89FFF] font-code-sm text-[11px] tracking-wider rounded border border-accent-purple/10 group-hover:border-accent-purple/25 transition-all">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Group 6: Languages */}
          <div className="glass-panel p-6 rounded border border-border-dim group hover:border-accent-orange/30 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <TerminalIcon size={18} className="text-accent-orange" />
              <h3 className="font-display-lg font-bold text-[16px] text-text-primary">
                Languages
              </h3>
            </div>
            <div className="text-[12px] text-text-muted font-light mb-5">
              Day-to-day tools
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["JavaScript", "TypeScript", "Python", "C#"].map((s) => (
                <span key={s} className="px-2 py-0.5 bg-accent-orange/5 text-[#FF9D78] font-code-sm text-[11px] tracking-wider rounded border border-accent-orange/10 group-hover:border-accent-orange/25 transition-all">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-border-dim max-w-[1200px] mx-auto" />

      {/* ==================== THE PROCESS SECTION ==================== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto relative z-10" id="process">
        <div className="section-eyebrow">05 — how I work</div>
        
        <h2 className="font-display-lg text-[36px] sm:text-[48px] font-extrabold text-text-primary leading-none uppercase mb-4">
          The Process
        </h2>
        <p className="font-body-base text-[16px] text-text-muted font-light mb-16 max-w-[540px]">
          Every engagement, every project — same five steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { num: "01", name: "Understand", desc: "Clarify the real problem before touching code. Align on constraints, users, and outcomes." },
            { num: "02", name: "Architect", desc: "Data models, API boundaries, component structure — designed before the first line." },
            { num: "03", name: "Build", desc: "Typed, precise, tested. Clean enough for the engineer who comes next." },
            { num: "04", name: "Integrate AI", desc: "LLM pipelines, vector stores, agentic tools — where they earn their place." },
            { num: "05", name: "Ship", desc: "Deploy, monitor, iterate. Production is where real engineering begins." }
          ].map((step, idx) => (
            <div 
              key={step.num} 
              className="glass-panel p-6 rounded border border-border-dim relative group hover:border-accent-chartreuse/35 transition-all flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="font-display-lg font-extrabold text-[36px] text-border-medium group-hover:text-accent-chartreuse/20 transition-colors leading-none mb-4">
                  {step.num}
                </div>
                <h3 className="font-display-lg font-bold text-[15px] text-text-primary group-hover:text-accent-chartreuse transition-colors mb-2">
                  {step.name}
                </h3>
                <p className="font-body-base text-[13px] text-text-muted leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              {/* Dynamic connectors, hidden on last item and layout dependent */}
              {idx < 4 && (
                <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-4 h-[1px] bg-border-medium z-10 hidden lg:block pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-border-dim max-w-[1200px] mx-auto" />

      {/* ==================== CERTIFICATIONS SECTION ==================== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto relative z-10">
        <div className="section-eyebrow">06 — credentials</div>
        
        <h2 className="font-display-lg text-[36px] sm:text-[48px] font-extrabold text-text-primary leading-none uppercase mb-16">
          Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "🤖", name: "The Complete Agentic AI Engineering Course", issuer: "Ed Donner · Udemy · 2025", border: "hover:border-accent-chartreuse/30" },
            { icon: "🧠", name: "LLM Engineering: Master AI, LLMs & Agents", issuer: "Ed Donner · Udemy", border: "hover:border-accent-purple/30" },
            { icon: "⚙️", name: "Node.js, Express, MongoDB & More", issuer: "Jonas Schmedtmann · Udemy", border: "hover:border-accent-orange/30" },
            { icon: "⚛️", name: "Web Development using ReactJS 2022", issuer: "Udemy", border: "hover:border-accent-chartreuse/30" }
          ].map((cert, idx) => (
            <div 
              key={idx} 
              className={`glass-panel p-5 rounded border border-border-dim flex items-start gap-4 transition-all duration-300 ${cert.border}`}
            >
              <span className="text-[26px] p-3 bg-white/5 border border-border-dim rounded flex items-center justify-center min-w-[56px] h-[56px]">
                {cert.icon}
              </span>
              <div>
                <h3 className="font-display-lg font-bold text-[15px] text-text-primary leading-tight mb-1.5">
                  {cert.name}
                </h3>
                <p className="font-body-base text-[12px] text-text-muted font-light">
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-border-dim max-w-[1200px] mx-auto" />

      {/* ==================== CONTACT SECTION ==================== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto relative z-10" id="contact">
        <div className="section-eyebrow">07 — contact</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-display-lg text-[40px] sm:text-[52px] font-extrabold text-text-primary leading-[1.1] mb-6 uppercase">
                Let&#39;s build<br />
                <span className="text-accent-chartreuse drop-shadow-[0_0_12px_rgba(200,240,90,0.1)]">something real.</span>
              </h2>
              <p className="font-body-base text-[16px] text-text-muted font-light leading-relaxed max-w-[480px] mb-10">
                Open to senior engineering roles, AI projects, and interesting problems. Remote-first. Based in Lahore, PKT (UTC+5). Usually responds within 24 hours.
              </p>
            </div>

            <div className="space-y-3.5 max-w-[440px]">
              <a 
                href="mailto:malikzohaibzahid78@gmail.com" 
                className="flex items-center justify-between p-4 rounded bg-card-dark border border-border-dim hover:border-accent-chartreuse/35 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[16px] text-accent-chartreuse">
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <span className="text-[14px] text-text-primary group-hover:text-accent-chartreuse transition-colors">Email</span>
                </div>
                <span className="font-code-sm text-[12px] text-text-muted">
                  malikzohaibzahid78@gmail.com
                </span>
              </a>

              <a 
                href="https://linkedin.com/in/zohaib-zahid-malik" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded bg-card-dark border border-border-dim hover:border-accent-purple/35 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[16px] text-accent-purple">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </span>
                  <span className="text-[14px] text-text-primary group-hover:text-accent-purple transition-colors">LinkedIn</span>
                </div>
                <span className="font-code-sm text-[12px] text-text-muted">
                  zohaib-zahid-malik
                </span>
              </a>

              <a 
                href="https://github.com/Malik-Zohaib-Debug" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded bg-card-dark border border-border-dim hover:border-accent-orange/35 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[16px] text-accent-orange">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </span>
                  <span className="text-[14px] text-text-primary group-hover:text-accent-orange transition-colors">GitHub</span>
                </div>
                <span className="font-code-sm text-[12px] text-text-muted">
                  Malik-Zohaib-Debug
                </span>
              </a>

              <a 
                href="tel:+923094382049" 
                className="flex items-center justify-between p-4 rounded bg-card-dark border border-border-dim hover:border-accent-chartreuse/35 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[16px] text-accent-chartreuse">
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <span className="text-[14px] text-text-primary group-hover:text-accent-chartreuse transition-colors">Phone / WhatsApp</span>
                </div>
                <span className="font-code-sm text-[12px] text-text-muted">
                  +92 309 438 2049
                </span>
              </a>
            </div>
          </div>

          {/* Fully Interactive Email Form */}
          <div className="lg:col-span-6 w-full">
            <div className="glass-panel p-6 sm:p-8 rounded border border-border-dim relative">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="flex flex-col">
                  <label className="font-code-sm text-[11px] text-text-muted tracking-widest uppercase mb-2">
                    Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    disabled={isSubmitting}
                    className="w-full bg-card-dark border border-border-medium rounded px-4.5 py-3 text-[14px] font-body-base text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-chartreuse/50 focus:shadow-[0_0_15px_rgba(200,240,90,0.1)] transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-code-sm text-[11px] text-text-muted tracking-widest uppercase mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    className="w-full bg-card-dark border border-border-medium rounded px-4.5 py-3 text-[14px] font-body-base text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-chartreuse/50 focus:shadow-[0_0_15px_rgba(200,240,90,0.1)] transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-code-sm text-[11px] text-text-muted tracking-widest uppercase mb-2">
                    Message
                  </label>
                  <textarea 
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell me what you're building…"
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full bg-card-dark border border-border-medium rounded px-4.5 py-3 text-[14px] font-body-base text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-chartreuse/50 focus:shadow-[0_0_15px_rgba(200,240,90,0.1)] transition-all duration-300 resize-y min-h-[120px]"
                  />
                </div>

                <AnimatePresence>
                  {formFeedback.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3.5 rounded text-[13px] font-body-base font-light border ${
                        formFeedback.type === "success" 
                          ? "bg-accent-chartreuse/5 border-accent-chartreuse/30 text-accent-chartreuse"
                          : "bg-red-500/5 border-red-500/30 text-red-400"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {formFeedback.type === "success" ? <CheckCircle2 size={16} /> : <Activity size={16} />}
                        {formFeedback.msg}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 bg-accent-chartreuse text-bg-dark font-display-lg font-bold text-[14px] uppercase tracking-wider rounded hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_20px_rgba(200,240,90,0.2)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-bg-dark border-t-transparent rounded-full animate-spin"></span>
                      sending...
                    </>
                  ) : (
                    <>
                      send message <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      <hr className="border-t border-border-dim max-w-[1200px] mx-auto" />

      {/* ==================== INTERACTIVE EXPANDING PROJECT DETAIL MODAL ==================== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="glass-panel w-full max-w-[800px] max-h-[85vh] overflow-y-auto rounded-lg p-6 sm:p-10 border border-accent-chartreuse/35 shadow-2xl relative scrollbar-thin scrollbar-thumb-accent-chartreuse/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating annotation */}
              <div className="absolute top-4 left-6 hidden sm:block bg-[#1A1A2E] border border-dashed border-accent-chartreuse/30 text-accent-chartreuse font-code-sm text-[8px] px-2 py-0.5 rounded tracking-wider uppercase">
                project_expanded_node // active
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-text-muted hover:text-accent-chartreuse p-2.5 rounded-full hover:bg-white/5 transition-all duration-300 cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              {/* Header */}
              <div className="mt-4 sm:mt-6 mb-6">
                <span className="font-code-sm text-[10px] sm:text-[11px] text-accent-chartreuse tracking-[0.12em] uppercase mb-2 block font-medium">
                  {selectedProject.type}
                </span>
                <h3 className="font-display-lg font-extrabold text-[26px] sm:text-[36px] text-text-primary leading-tight drop-shadow-[0_0_15px_rgba(200,240,90,0.1)]">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-body-base text-[15px] sm:text-[16px] text-text-muted leading-relaxed mb-8 font-light">
                {selectedProject.desc}
              </p>

              {/* Key Contributions & Features */}
              {selectedProject.bullets && selectedProject.bullets.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-code-sm text-[10px] sm:text-[11px] text-text-primary tracking-[0.15em] uppercase mb-4 pb-2 border-b border-border-dim font-bold">
                    Key Contributions &amp; Achievements
                  </h4>
                  <ul className="space-y-4 list-none pl-0">
                    {selectedProject.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="font-body-base text-[14px] text-text-muted font-light leading-relaxed pl-6 relative hover:text-text-primary transition-colors duration-300">
                        <span className="absolute left-0 text-accent-chartreuse font-bold">→</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Metrics Section */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-code-sm text-[10px] sm:text-[11px] text-text-primary tracking-[0.15em] uppercase mb-4 pb-2 border-b border-border-dim font-bold">
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedProject.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="glass-panel p-4 rounded border border-border-dim text-center hover:border-accent-chartreuse/25 transition-all">
                        <span className="font-display-lg font-bold text-[20px] text-accent-chartreuse block mb-1">
                          {metric.val}
                        </span>
                        <span className="text-[11px] text-text-muted leading-tight block uppercase tracking-wider font-light">
                          {metric.lbl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="font-code-sm text-[10px] sm:text-[11px] text-text-primary tracking-[0.15em] uppercase mb-4 font-bold">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className={`px-3 py-1.5 rounded text-[11px] font-code-sm tracking-wider ${
                        tag.theme === "blue" 
                          ? "bg-accent-purple/10 text-[#A89FFF] border border-accent-purple/10" 
                          : tag.theme === "orange"
                          ? "bg-accent-orange/10 text-[#FF9D78] border border-accent-orange/10"
                          : "bg-tag-bg text-accent-chartreuse border border-accent-chartreuse/10"
                      }`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
