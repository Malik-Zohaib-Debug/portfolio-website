"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const languages = ["JavaScript", "TypeScript", "Python"];
  const technologies = [
    "React", "Next.js", "Django", "Node.js", "Express",
    "LangChain", "LangGraph", "Git", "Docker", "AWS",
    "GCP", "PostgreSQL", "MongoDB", "Tailwind CSS"
  ];
  
  const skillData = [
    { name: "JavaScript", slug: "javascript", hex: "F7DF1E" },
    { name: "TypeScript", slug: "typescript", hex: "3178C6" },
    { name: "Python", slug: "python", hex: "3776AB" },
    { name: "React", slug: "react", hex: "61DAFB" },
    { name: "Next.js", slug: "nextdotjs", hex: "FFFFFF" },
    { name: "Django", slug: "django", hex: "44B78B" },
    { name: "Node.js", slug: "nodedotjs", hex: "339933" },
    { name: "Express", slug: "express", hex: "FFFFFF" },
    { name: "LangChain", slug: "langchain", hex: "FFFFFF" },
    { name: "LangGraph", slug: "", hex: "00f0ff" },
    { name: "Git", slug: "git", hex: "F05032" },
    { name: "Docker", slug: "docker", hex: "2496ED" },
    { name: "AWS", slug: "amazonaws", hex: "FF9900" },
    { name: "GCP", slug: "googlecloud", hex: "4285F4" },
    { name: "PostgreSQL", slug: "postgresql", hex: "4169E1" },
    { name: "MongoDB", slug: "mongodb", hex: "47A248" },
    { name: "Tailwind CSS", slug: "tailwindcss", hex: "06B6D4" },
  ];

  const allSkillsHtml = skillData.map(skill => {
    const imgUrl = skill.slug ? `https://cdn.simpleicons.org/${skill.slug}/${skill.hex}` : '';
    const imgTag = imgUrl ? `<img src="${imgUrl}" style="width: 16px; height: 16px; object-fit: contain;" alt="${skill.name}" />` : '';
    return `
      <div style="display: flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 9999px; border: 1px solid #${skill.hex}40; background-color: rgba(18,19,21,0.8); backdrop-filter: blur(8px); box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 10px #${skill.hex}20;">
        ${imgTag}
        <span style="font-family: monospace; font-size: 12px; font-weight: bold; color: #${skill.hex}; white-space: nowrap;">${skill.name}</span>
      </div>
    `;
  });

  useEffect(() => {
    let instance: any = null;
    let isMounted = true;
    const container = containerRef.current;

    if (container) {
      container.innerHTML = ""; // Clear existing on re-mount
      import("TagCloud").then((TagCloudModule) => {
        if (!isMounted) return; // Prevent initializing if navigated away during import
        
        const TagCloud = TagCloudModule.default || TagCloudModule;
        instance = TagCloud([container], allSkillsHtml, {
          radius: window.innerWidth < 768 ? 160 : 280,
          maxSpeed: "normal",
          initSpeed: "normal",
          direction: 135,
          keep: true,
          useHTML: true,
        } as any);
      });
    }

    return () => {
      isMounted = false;
      if (instance) {
        try {
          instance.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
      }
      // Forcefully clear the container's contents on unmount to prevent ghosts
      if (container) {
        container.innerHTML = "";
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="md:ml-20 pt-24 min-h-screen px-8 md:px-16 max-w-6xl mx-auto pb-24 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div variants={revealVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded mb-6">
          <span className="font-label-caps text-secondary-fixed">FORGE</span>
        </motion.div>
        
        <motion.h1 variants={revealVariants} className="font-display-lg text-5xl md:text-7xl mb-16 tracking-tighter uppercase text-white">
          TECHNICAL EXPERTISE
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Categorized List */}
          <div className="lg:col-span-5 space-y-12">
            <motion.section variants={revealVariants}>
              <h2 className="font-headline-md text-2xl text-primary-container mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
                Languages
              </h2>
              <div className="flex flex-wrap gap-3">
                {languages.map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 glass-panel border border-primary-container/30 font-mono text-sm text-white rounded hover:bg-primary-container/10 hover:text-primary-container transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.section variants={revealVariants}>
              <h2 className="font-headline-md text-2xl text-primary-container mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {technologies.map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 glass-panel border border-white/10 font-mono text-sm text-gray-300 rounded hover:border-cyan-400/50 hover:text-cyan-400 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column: 3D Globe */}
          <motion.div variants={revealVariants} className="lg:col-span-7 flex items-center justify-center relative min-h-[400px] lg:min-h-[600px]">
            {/* Glowing background behind the globe */}
            <div className="absolute w-[80%] h-[80%] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            {/* 3D Wireframe Globe */}
            <div className="wireframe-globe">
              <div className="wireframe-ring"></div>
              <div className="wireframe-ring"></div>
              <div className="wireframe-ring"></div>
              <div className="wireframe-ring"></div>
              <div className="wireframe-ring"></div>
              <div className="wireframe-ring"></div>
              
              <div className="wireframe-ring-h r1"></div>
              <div className="wireframe-ring-h r2"></div>
              <div className="wireframe-ring-h r3"></div>
              <div className="wireframe-ring-h r4"></div>
              <div className="wireframe-ring-h r5"></div>
            </div>

            {/* The TagCloud container */}
            <div 
              ref={containerRef} 
              className="text-cyan-400 font-display-lg font-bold tracking-widest uppercase [&_.tagcloud]:mx-auto [&_.tagcloud--item]:cursor-crosshair hover:[&_.tagcloud--item]:text-white transition-colors duration-300 z-10"
            ></div>
          </motion.div>

        </div>
      </motion.div>
    </main>
  );
}
