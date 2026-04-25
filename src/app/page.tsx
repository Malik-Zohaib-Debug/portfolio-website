"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Segment {
  text: string;
  className: string;
}

function TypewriterText({ segments, speed = 50, delay = 0, cursorColor = "bg-primary-container" }: { segments: Segment[], speed?: number, delay?: number, cursorColor?: string }) {
  const [charIndex, setCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const chars: {char: string, className: string}[] = [];
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
        setCharIndex(prev => prev + 1);
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
        className={`inline-block w-[0.3em] h-[1em] align-middle ml-2 ${cursorColor}`}
        style={{ marginBottom: '0.1em' }}
      />
    </>
  );
}

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <main className="md:ml-20 pt-16 min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="min-h-[90vh] flex flex-col justify-center px-8 md:px-16 border-b border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-6xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div variants={revealVariants} className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
              <span className="font-label-caps text-secondary-fixed">STATUS: READY_TO_ARCHITECT</span>
            </div>
            
            <h1 className="font-display-lg text-6xl md:text-8xl mb-6 tracking-tighter leading-none uppercase min-h-[1.2em]">
              <TypewriterText 
                segments={[
                  { text: "MUHAMMAD ", className: "" },
                  { text: "ZOHAIB", className: "text-primary-container" },
                  { text: " ZAHID", className: "" }
                ]} 
                speed={80}
                delay={200}
              />
            </h1>
            
            <p className="text-headline-md text-on-surface-variant font-headline-md mb-8 max-w-xl">
              Full-Stack Software Developer with 3+ years of experience crafting intelligent ecosystems with high-precision engineering.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary-container text-on-primary-container px-8 py-4 font-label-caps tracking-widest hover:bg-white glow-cyan transition-all transform hover:-translate-y-1 active:scale-95">
                VIEW_PROJECTS
              </button>
              <button className="border border-white/20 text-white px-8 py-4 font-label-caps tracking-widest hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95">
                RESUME
              </button>
            </div>
          </motion.div>
          
          <motion.div variants={revealVariants} className="lg:col-span-5 relative group">
            <div className="relative w-full aspect-square md:aspect-[4/5] glass-panel p-2 rounded-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/10 to-transparent z-10 pointer-events-none"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt=" Zohaib Zahid" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-lg" src="/zohaib.png" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel border-white/10 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-mono text-[10px] text-cyan-400">ARCHITECT_ID</p>
                    <p className="font-display-lg text-sm text-white font-bold">ZOHAIB ZAHID</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-xs text-secondary-fixed">verified_user</span>
                    <span className="material-symbols-outlined text-xs text-primary-container">sensors</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-6 hidden lg:block w-72 glass-panel p-4 font-mono text-[10px] shadow-2xl whitespace-pre-wrap">
              <div className="flex gap-1 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
              </div>
              <TypewriterText 
                segments={[
                  { text: "const ", className: "text-purple-400" },
                  { text: "architect = {\n  role: ", className: "" },
                  { text: "'AI Engineer'", className: "text-secondary-fixed" },
                  { text: ",\n  stack: [", className: "" },
                  { text: "'Next'", className: "text-cyan-400" },
                  { text: ", ", className: "" },
                  { text: "'LangChain'", className: "text-cyan-400" },
                  { text: "],\n  status: ", className: "" },
                  { text: "'Deploying...'", className: "text-secondary-fixed" },
                  { text: "\n};", className: "" }
                ]}
                speed={30}
                delay={1500}
                cursorColor="bg-secondary-fixed"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Bento Grid Skills */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="py-24 px-8 md:px-16 bg-surface-container-lowest border-b border-white/5"
      >
        <motion.div variants={revealVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="font-display-lg text-4xl uppercase tracking-tighter">TECHNICAL_STACK</h2>
            <p className="text-on-surface-variant font-body-base max-w-md">Engineered for performance and scalability using modern frameworks and AI-driven methodologies.</p>
          </div>
          <div className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase">SYSTEM_CAPABILITIES_REPORT</div>
        </motion.div>
        
        <motion.div variants={revealVariants} className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-4">
          <div className="md:col-span-2 md:row-span-2 glass-panel p-8 group card-hover-effect overflow-hidden relative">
            <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[180px]">psychology</span>
            </div>
            <span className="material-symbols-outlined text-primary-container mb-6 text-4xl">neurology</span>
            <h3 className="font-headline-md mb-4 text-white">AI &amp; Large Language Models</h3>
            <p className="text-on-surface-variant text-body-base mb-6">Expertise in LangChain, LangGraph, and vector databases (Pinecone, Qdrant) to build agentic RAG systems.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-400">LANGCHAIN</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-400">OPENAI SDK</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-400">AGENTIC AI</span>
            </div>
          </div>
          
          <div className="glass-panel p-6 card-hover-effect">
            <span className="material-symbols-outlined text-secondary-fixed mb-4">auto_awesome</span>
            <h4 className="font-headline-md text-lg text-white mb-2">Frontend Engine</h4>
            <p className="text-on-surface-variant text-xs font-body-base">React, Next.js, TypeScript, and Tailwind CSS for responsive, pixel-perfect interfaces.</p>
          </div>
          
          <div className="glass-panel p-6 card-hover-effect">
            <span className="material-symbols-outlined text-secondary-fixed mb-4">settings_ethernet</span>
            <h4 className="font-headline-md text-lg text-white mb-2">Backend Architecture</h4>
            <p className="text-on-surface-variant text-xs font-body-base">Python, Django DRF, Node.js, and Express powering complex business logic.</p>
          </div>
          
          <div className="glass-panel p-6 card-hover-effect">
            <span className="material-symbols-outlined text-secondary-fixed mb-4">storage</span>
            <h4 className="font-headline-md text-lg text-white mb-2">Data Persistence</h4>
            <p className="text-on-surface-variant text-xs font-body-base">PostgreSQL, MongoDB, Redis, and Firebase real-time integration.</p>
          </div>
          
          <div className="glass-panel p-6 card-hover-effect">
            <span className="material-symbols-outlined text-secondary-fixed mb-4">rocket_launch</span>
            <h4 className="font-headline-md text-lg text-white mb-2">Infrastructure</h4>
            <p className="text-on-surface-variant text-xs font-body-base">AWS (S3, EC2), GCP (CI/CD), Docker, and Git version control.</p>
          </div>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="py-24 px-8 md:px-16 border-t border-white/5"
      >
        <motion.h2 variants={revealVariants} className="font-display-lg text-4xl uppercase tracking-tighter mb-16 text-center">CORE_PROJECT_PORTFOLIO</motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              title: "Walmart Virtual Store CMS",
              desc: "Optimized performance for virtual store creation tools, implementing automated workflows for product approval and load time improvements.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkSHU5hTfPaXiZWfbxxYlvfkxvrM7oaLzXPfjluDfUzer5dNGzbHlFDJ5afevdcQkRO3f8eaSug7MpT7HHi3gs6VwkCC_EAM7Vnl3yrKv94aUleAi7NLCsZ4_YyYGjh6l8z5yWwKda7mYG4bR9oqSvqa8_QRJKbL3budhd8aRKb1lQKFiDiP22IOqOuQBKKZ4TNA_29YUm1s9gUkDlFJs_HMqnwvhNkuVOnnWR0U_4CmqNuOsxBtWKzF5pzaQpTASE_BoJO53-cvtb",
              tags: [{text: "NEXT_JS", class: "bg-secondary-fixed text-on-secondary-fixed"}, {text: "DJANGO", class: "bg-white/10 backdrop-blur-md text-white"}]
            },
            {
              title: "Emperia QuickStitch Dashboard",
              desc: "Built a multi-organization dashboard with real-time analytics and dynamic plan management for 3D virtual world rendering.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEmgsvmoCKJq_2dHn8SVQuW7P76PYRuCW9R9X3IzXyhaaYpwFHoe51ecxnQ0nO0zA6Vgef0cWiVgcEsDqpHM_S4vqzBZAkv2JC-OJJiGH2xGI54O54NpY_Xx7ikAG9NzMLwFvH2UO-PYHd15QPS_1VVNUf6g-oyciFsjFNcPbvds6AcDbcIkYyaAZ8nedwdOy0GstEqockKd3DeMyp2qYeRY3E4tDuN73Bas4xldpoVUQXY2cAymKri8CzUycslnzy3lMEEL81p76u",
              tags: [{text: "REACT", class: "bg-secondary-fixed text-on-secondary-fixed"}, {text: "M3TER", class: "bg-white/10 backdrop-blur-md text-white"}]
            },
            {
              title: "Directed IRA Secure Portal",
              desc: "Enhanced platform security by 40% and improved system scalability through automated transaction processing and NestJS architecture.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3Oyujtcg2IUi2OPG5cJTqpdeOb3j7fFChOerGORbcp31GhT3NQ9fj5jsovx9mI-rQojyahNMHIRXvxhl46WwA2ScDkITvDD710RLCaHR5baB6iLX2teS2ZYjqgOR5s5D2_YQGmXnvBx-hyH0whZmY64xspDL7m3NXlYTdSmxMyir61ZoGew9-znfc5duhyaOVe3z00aDw-aVlwvAswPkFiEgcrhfWQ0IH44QmYmPSUL7iFBrE6Kt4P-mq-nLeN0CnpF9yBdqYqOyr",
              tags: [{text: "NESTJS", class: "bg-secondary-fixed text-on-secondary-fixed"}, {text: "POSTGRES", class: "bg-white/10 backdrop-blur-md text-white"}]
            },
            {
              title: "Dark Weather (AI Powered)",
              desc: "Architected an agentic AI weather assistant using OpenAI SDK and vector databases for personalized conversational context.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6jcItg94FSXWSBraRv6NJL1vZJ4D1sill-hMkNVZBv_1wpjsviYF5jS5M8DntXRz1tcPo_drsgHzDUa22WKYymxnkzAZOkprZaR96V95COpL3lY7f0WgdjbzoKzBuwVWAijb7wCtrOFHRUoVADJBfxubF9A4fMrKdmBnh94_9NjXN23_gCesODWB1f2Iu0X0Y6rXLbRzw9WkC_QmGARSi8S0lMIQhSrAO9vt_aiAl7dEMQSfXEOKljkymqvQQxOGMj0UbnkzGxHV3",
              tags: [{text: "PYTHON", class: "bg-secondary-fixed text-on-secondary-fixed"}, {text: "OPENAI SDK", class: "bg-white/10 backdrop-blur-md text-white"}]
            }
          ].map((proj, idx) => (
            <motion.div variants={revealVariants} key={idx} className="flex flex-col gap-6 group">
              <div className="relative aspect-video overflow-hidden border border-white/10 glass-panel card-hover-effect">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" src={proj.img} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={`${tag.class} px-2 py-1 text-[10px] font-bold`}>{tag.text}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-headline-md text-white mb-2 group-hover:text-primary-container transition-colors">{proj.title}</h3>
                <p className="text-on-surface-variant text-body-base">{proj.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Professional Experience & Certs */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="py-24 px-8 md:px-16 grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-white/5"
      >
        <motion.div variants={revealVariants} className="lg:col-span-2">
          <h2 className="font-display-lg text-4xl uppercase tracking-tighter mb-12">EXPERIENCE_HISTORY</h2>
          <div className="space-y-12">
            <div className="relative pl-8 border-l border-primary-container/20 hover:border-primary-container transition-all">
              <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-primary-container rounded-full"></div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-headline-md text-white">Software Engineer</h4>
                <span className="font-mono text-xs text-primary-container">08/2023 — PRESENT</span>
              </div>
              <p className="text-secondary-fixed font-label-caps mb-4 uppercase">Geekybugs, Lahore, Pakistan</p>
              <ul className="text-on-surface-variant text-sm font-body-base space-y-2 list-disc list-inside">
                <li>Optimized application performance by refactoring components and state management.</li>
                <li>Partnered with design teams to translate requirements into refined UI/UX flows.</li>
                <li>Migrated legacy frontend views into pixel-perfect web applications.</li>
                <li>Mentored junior interns, providing guidance on coding challenges and workflows.</li>
              </ul>
            </div>
            
            <div className="relative pl-8 border-l border-white/20">
              <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-white/20 rounded-full"></div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-headline-md text-white">BS in Software Engineering</h4>
                <span className="font-mono text-xs text-gray-500">10/2019 — 07/2023</span>
              </div>
              <p className="text-secondary-fixed font-label-caps mb-4 uppercase">University of Management and Technology</p>
              <p className="text-on-surface-variant text-sm font-body-base">Relevant coursework: Programming Fundamentals, OOP, Data Structures, Machine Learning, Deep Learning, and Information Security.</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={revealVariants} className="lg:col-span-1">
          <h2 className="font-display-lg text-4xl uppercase tracking-tighter mb-12">CREDENTIALS</h2>
          <div className="space-y-6">
            <div className="glass-panel p-4 flex items-center gap-4 border-l-4 border-secondary-fixed card-hover-effect">
              <span className="material-symbols-outlined text-secondary-fixed">workspace_premium</span>
              <div>
                <p className="text-white font-bold text-sm">The Complete Agentic AI Engineering</p>
                <p className="text-on-surface-variant text-[10px] font-mono">ED DONNER / UDEMY (2025)</p>
              </div>
            </div>
            <div className="glass-panel p-4 flex items-center gap-4 border-l-4 border-secondary-fixed card-hover-effect">
              <span className="material-symbols-outlined text-secondary-fixed">school</span>
              <div>
                <p className="text-white font-bold text-sm">LLM Engineering: Master AI</p>
                <p className="text-on-surface-variant text-[10px] font-mono">DEEPLEARNING.AI</p>
              </div>
            </div>
            <div className="glass-panel p-4 flex items-center gap-4 border-l-4 border-secondary-fixed card-hover-effect">
              <span className="material-symbols-outlined text-secondary-fixed">verified</span>
              <div>
                <p className="text-white font-bold text-sm">Node.js, Express, MongoDB</p>
                <p className="text-on-surface-variant text-[10px] font-mono">JONAS SCHMEDTMANN / UDEMY</p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-secondary-fixed/5 border border-secondary-fixed/20 rounded-lg group hover:bg-secondary-fixed/10 transition-colors">
              <h4 className="font-label-caps text-secondary-fixed mb-2 tracking-[0.2em]">CONTACT_ENCRYPTED</h4>
              <p className="text-white font-mono text-xs mb-2">EMAIL: malikzohaibzahid78@gmail.com</p>
              <p className="text-white font-mono text-xs mb-2">PHONE: 0309 438 2049</p>
              <p className="text-white font-mono text-xs mb-4">LOCATION: Lahore, Punjab Pakistan</p>
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <a className="text-gray-400 hover:text-white transition-colors" href="https://github.com/Malik-Zohaib-Debug" target="_blank" rel="noreferrer">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                </a>
                <a className="text-gray-400 hover:text-white transition-colors" href="https://www.linkedin.com/in/zohaib-zahid-malik" target="_blank" rel="noreferrer">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
