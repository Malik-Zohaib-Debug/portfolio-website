"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillCategories = [
  {
    id: "foundation",
    title: "Foundation",
    skills: ["Programming Fundamentals", "Data Structures & Algorithms", "Object Oriented Programming", "Database Management"]
  },
  {
    id: "languages",
    skills: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS", "Bash", "C++", "ReactJS", "NextJS", "NestJS", "Django", "NodeJS", "MongoDB", "Postgres", "Tailwind CSS", "Chakra UI"]
  },
  {
    id: "aiml",
    title: "AI/ML",
    skills: ["LangChain", "LangGraph", "Vector Databases", "Prompt Engineering", "OpenAI API", "Anthropic API", "Agentic AI", "MCP"]
  },
  {
    id: "tools",
    title: "Tools & Tech",
    skills: ["Numpy", "Pandas", "Scikit-Learn", "Tensorflow", "Keras", "Matplotlib", "AWS", "GCP", "Docker", "Redis", "Docker", "GCP", "AWS"]
  }
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
  { name: "AWS", slug: "amazonaws", hex: "FF9900", fallbackImg: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "GCP", slug: "googlecloud", hex: "4285F4" },
  { name: "PostgreSQL", slug: "postgresql", hex: "4169E1" },
  { name: "MongoDB", slug: "mongodb", hex: "47A248" },
  { name: "Tailwind CSS", slug: "tailwindcss", hex: "06B6D4" },
];


export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);

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

  const getSkillIconData = (skillName: string) => {
    const normalized = skillName.toLowerCase();
    const mappings: Record<string, {slug?: string, hex?: string, fallbackImg?: string, materialIcon?: string}> = {
      "javascript": { slug: "javascript", hex: "F7DF1E" },
      "typescript": { slug: "typescript", hex: "3178C6" },
      "python": { slug: "python", hex: "3776AB" },
      "sql": { materialIcon: "database", hex: "00f0ff" },
      "html/css": { slug: "html5", hex: "E34F26" },
      "bash": { slug: "gnubash", hex: "4EAA25" },
      "c++": { slug: "cplusplus", hex: "00599C" },
      "reactjs": { slug: "react", hex: "61DAFB" },
      "nextjs": { slug: "nextdotjs", hex: "FFFFFF" },
      "nestjs": { slug: "nestjs", hex: "E0234E" },
      "django": { slug: "django", hex: "44B78B" },
      "nodejs": { slug: "nodedotjs", hex: "339933" },
      "mongodb": { slug: "mongodb", hex: "47A248" },
      "postgres": { slug: "postgresql", hex: "4169E1" },
      "tailwind css": { slug: "tailwindcss", hex: "06B6D4" },
      "chakra ui": { slug: "chakraui", hex: "319795" },
      
      "langchain": { slug: "langchain", hex: "FFFFFF" },
      "langgraph": { materialIcon: "account_tree", hex: "00f0ff" },
      "vector databases": { materialIcon: "schema", hex: "00f0ff" },
      "prompt engineering": { materialIcon: "chat", hex: "c3f400" },
      "openai api": { slug: "openai", hex: "FFFFFF" },
      "anthropic api": { slug: "anthropic", hex: "D97757" },
      "agentic ai": { materialIcon: "smart_toy", hex: "00f0ff" },
      "mcp": { materialIcon: "memory", hex: "c3f400" },
      
      "numpy": { slug: "numpy", hex: "013243" },
      "pandas": { slug: "pandas", hex: "150458" },
      "scikit-learn": { slug: "scikitlearn", hex: "F7931E" },
      "tensorflow": { slug: "tensorflow", hex: "FF6F00" },
      "keras": { slug: "keras", hex: "D00000" },
      "matplotlib": { materialIcon: "bar_chart", hex: "00f0ff" },
      "aws": { slug: "amazonaws", hex: "FF9900", fallbackImg: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg" },
      "gcp": { slug: "googlecloud", hex: "4285F4" },
      "docker": { slug: "docker", hex: "2496ED" },
      "redis": { slug: "redis", hex: "DC382D" },
      
      // "programming fundamentals": { materialIcon: "terminal", hex: "00f0ff" },
      // "data structures & algorithms": { materialIcon: "account_tree", hex: "c3f400" },
      // "object oriented programming": { materialIcon: "data_object", hex: "00f0ff" },
      // "database management": { materialIcon: "database", hex: "c3f400" }
    };
    
    return mappings[normalized] || { materialIcon: "code", hex: "ffffff" };
  };

  const allSkillsHtml = skillData.map(skill => {
    const imgUrl = skill.fallbackImg || (skill.slug ? `https://cdn.simpleicons.org/${skill.slug}/${skill.hex}` : '');
    const iconHtml = imgUrl 
      ? `<img src="${imgUrl}" style="width: 18px; height: 18px; object-fit: contain; filter: drop-shadow(0 0 8px #${skill.hex}80);" alt="${skill.name}" />` 
      : `<span class="material-symbols-outlined" style="font-size: 18px; color: #${skill.hex || 'fff'}; text-shadow: 0 0 8px #${skill.hex || 'fff'}80;">${(skill as any).materialIcon || 'code'}</span>`;
      
    return `
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.1); background: linear-gradient(135deg, rgba(20,20,22,0.9), rgba(10,10,12,0.9)); backdrop-filter: blur(12px); box-shadow: 0 4px 24px rgba(0,0,0,0.6), inset 0 0 12px rgba(255,255,255,0.05), 0 0 15px #${skill.hex || 'fff'}40; transition: all 0.3s ease;">
        ${iconHtml}
        <span style="font-family: var(--font-display-lg, monospace); font-size: 14px; font-weight: 700; color: #fff; text-shadow: 0 0 10px #${skill.hex || 'fff'}80; letter-spacing: 0.05em; white-space: nowrap;">${skill.name}</span>
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
          radius: window.innerWidth < 768 ? 160 : 320,
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Categorized List */}
          <motion.div variants={revealVariants} className="lg:col-span-5 flex flex-col mt-4">
            
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-t-md transition-all ${
                    activeTab === category.id 
                      ? 'text-primary-container border-b-2 border-primary-container bg-primary-container/10' 
                      : 'text-on-surface-variant hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category.title || "Languages"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {skillCategories.map((category) => (
                  category.id === activeTab && (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {category.skills.map((skill, idx) => {
                          const iconData = getSkillIconData(skill);
                          const imgUrl = iconData.fallbackImg || (iconData.slug ? `https://cdn.simpleicons.org/${iconData.slug}/${iconData.hex}` : '');
                          
                          return (
                            <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center gap-3 p-3 glass-panel border border-white/10 rounded-lg group hover:border-primary-container/50 hover:bg-primary-container/5 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all cursor-default"
                            >
                              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center group-hover:bg-primary-container/20 transition-colors border border-white/5 group-hover:border-primary-container/30">
                                {imgUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={imgUrl} alt={skill} className="w-5 h-5 object-contain" style={{ filter: `drop-shadow(0 0 4px #${iconData.hex}80)` }} />
                                ) : (
                                  <span className="material-symbols-outlined text-[18px]" style={{ color: `#${iconData.hex || 'fff'}` }}>
                                    {iconData.materialIcon}
                                  </span>
                                )}
                              </div>
                              <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: 3D Globe */}
          <motion.div variants={revealVariants} className="lg:col-span-7 flex items-center justify-center relative min-h-[400px] lg:min-h-[600px]">
            {/* Glowing background behind the globe */}
            <div className="absolute w-[80%] h-[80%] bg-primary-container/10 rounded-full blur-[100px] pointer-events-none"></div>
            
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
              className="font-display-lg font-bold tracking-widest uppercase [&_.tagcloud]:mx-auto [&_.tagcloud--item]:cursor-crosshair [&_.tagcloud--item]:z-20 hover:[&_.tagcloud--item]:scale-110 transition-transform duration-300 z-10"
            ></div>
          </motion.div>

        </div>
      </motion.div>
    </main>
  );
}
