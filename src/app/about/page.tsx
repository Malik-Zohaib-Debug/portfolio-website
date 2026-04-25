"use client";

import { motion } from "framer-motion";

export default function About() {
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
    <main className="md:ml-20 pt-24 min-h-screen px-8 md:px-16 max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16"
      >
        <motion.div variants={revealVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded mb-6">
          <span className="font-label-caps text-secondary-fixed">WHO I AM</span>
        </motion.div>
        
        <motion.h1 variants={revealVariants} className="font-display-lg text-5xl md:text-7xl mb-12 tracking-tighter uppercase text-white">
          PERSONA
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <motion.section variants={revealVariants}>
              <h2 className="font-headline-md text-3xl text-primary-container mb-6">Hi, I&#39;m Zohaib</h2>
              <p className="text-on-surface-variant font-body-base leading-relaxed mb-6">
                I am a passionate AI Software Architect and Full-Stack Developer with over 3 years of experience. I build at the intersection of modern full-stack engineering and applied Artificial Intelligence.
              </p>
              <p className="text-on-surface-variant font-body-base leading-relaxed">
                My current focus lies in building agentic RAG systems, integrating Large Language Models via LangChain and OpenAI, and crafting pixel-perfect, highly responsive frontends using Next.js and Framer Motion. I believe in engineering systems that are not just functional, but visually stunning and inherently intelligent.
              </p>
            </motion.section>

            <motion.section variants={revealVariants} className="border-t border-white/10 pt-12">
              <h2 className="font-headline-md text-2xl text-white mb-8">Education</h2>
              
              <div className="relative pl-8 border-l border-primary-container/20">
                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-primary-container rounded-full"></div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl text-white font-bold">University of Management and Technology</h3>
                  <span className="font-mono text-xs text-primary-container">10/2019 — 07/2023</span>
                </div>
                <p className="text-secondary-fixed font-label-caps mb-4 uppercase">Bachelors of Science in Software Engineering</p>
                <p className="text-on-surface-variant text-sm font-body-base">
                  Relevant coursework: Programming Fundamentals, Object-Oriented Programming, Data Structures, Machine Learning, Deep Learning, and Information Security.
                </p>
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <motion.div variants={revealVariants} className="glass-panel p-6 card-hover-effect">
              <h3 className="font-label-caps text-secondary-fixed mb-6 tracking-[0.2em]">FIND ME ON</h3>
              <div className="space-y-4">
                <a href="https://github.com/Malik-Zohaib-Debug" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors group">
                  <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">code</span>
                  <span className="font-mono text-sm uppercase">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/zohaib-zahid-malik" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors group">
                  <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">work</span>
                  <span className="font-mono text-sm uppercase">LinkedIn</span>
                </a>
                <a href="mailto:malikzohaibzahid78@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors group">
                  <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">mail</span>
                  <span className="font-mono text-sm uppercase">Email</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
