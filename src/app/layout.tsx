import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Zohaib Zahid — Portfolio",
  description: "Full-Stack AI Engineer crafting production-grade intelligent ecosystems with high-precision engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body-base overflow-x-hidden min-h-full flex flex-col bg-bg-dark text-text-primary selection:bg-accent-chartreuse selection:text-bg-dark">
        {/* Customized mouse cursor */}
        <CustomCursor />
        
        {/* Top Navigation Bar aligned with wireframe */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-[#0A0A0F]/85 backdrop-blur-xl border-b border-border-dim shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
          <Link 
            href="/#hero" 
            className="text-[15px] font-extrabold tracking-widest font-display-lg uppercase text-text-primary hover:opacity-90 transition-opacity cursor-pointer"
          >
            M_ZOHAIB<span className="text-accent-chartreuse">.DEV</span>
          </Link>
          
          <div className="hidden md:flex gap-8 items-center">
            <Link className="font-code-sm text-[13px] tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors cursor-pointer" href="/#about">About</Link>
            <Link className="font-code-sm text-[13px] tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors cursor-pointer" href="/#work">Work</Link>
            <Link className="font-code-sm text-[13px] tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors cursor-pointer" href="/#experience">Experience</Link>
            <Link className="font-code-sm text-[13px] tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors cursor-pointer" href="/#skills">Skills</Link>
            <Link className="font-code-sm text-[13px] tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors cursor-pointer" href="/#contact">Contact</Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-r border-border-dim pr-4">
              <a 
                className="text-text-muted hover:text-accent-chartreuse hover:-translate-y-0.5 transition-all duration-300 flex items-center" 
                href="https://github.com/Malik-Zohaib-Debug" 
                target="_blank" 
                rel="noreferrer"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
              </a>
              <a 
                className="text-text-muted hover:text-accent-chartreuse hover:-translate-y-0.5 transition-all duration-300 flex items-center" 
                href="https://www.linkedin.com/in/zohaib-zahid-malik" 
                target="_blank" 
                rel="noreferrer"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
            <a 
              href="mailto:malikzohaibzahid78@gmail.com" 
              className="px-4 py-2 bg-accent-chartreuse text-[#0A0A0F] font-code-sm text-[12px] font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all rounded shadow-md"
            >
              hire_me →
            </a>
          </div>
        </nav>

        {/* Side Monitor Status Bar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-20 flex flex-col items-center py-8 z-40 bg-[#0A0A0F]/80 backdrop-blur-md border-r border-border-dim hidden md:flex">
          <div className="mb-12 flex flex-col items-center">
            <div className="w-10 h-10 bg-[#1A1A2E] rounded-full flex items-center justify-center border border-accent-chartreuse/20 overflow-hidden ring-2 ring-accent-chartreuse/5 relative group hover:border-accent-chartreuse/40 transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" src="/zohaib.png" />
            </div>
            <p className="font-code-sm text-[8px] uppercase tracking-widest text-accent-chartreuse mt-2 select-none">v5.1.0</p>
          </div>
          <div className="flex flex-col gap-8 flex-1">
            <Link 
              href="/#hero" 
              className="group cursor-pointer flex flex-col items-center gap-1.5 bg-accent-chartreuse/5 text-accent-chartreuse border-l-2 border-accent-chartreuse px-4 py-2 hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
              <span className="font-code-sm text-[9px] uppercase tracking-widest text-text-muted group-hover:text-accent-chartreuse transition-colors">Root</span>
            </Link>
            <Link 
              href="/#work" 
              className="group cursor-pointer flex flex-col items-center gap-1.5 text-text-muted hover:text-accent-chartreuse transition-all hover:translate-x-0.5 duration-200"
            >
              <span className="material-symbols-outlined text-[20px]">source</span>
              <span className="font-code-sm text-[9px] uppercase tracking-widest">Source</span>
            </Link>
            <Link 
              href="/#skills" 
              className="group cursor-pointer flex flex-col items-center gap-1.5 text-text-muted hover:text-accent-chartreuse transition-all hover:translate-x-0.5 duration-200"
            >
              <span className="material-symbols-outlined text-[20px]">extension</span>
              <span className="font-code-sm text-[9px] uppercase tracking-widest">Stack</span>
            </Link>
            <Link 
              href="/#experience" 
              className="group cursor-pointer flex flex-col items-center gap-1.5 text-text-muted hover:text-accent-chartreuse transition-all hover:translate-x-0.5 duration-200"
            >
              <span className="material-symbols-outlined text-[20px]">database</span>
              <span className="font-code-sm text-[9px] uppercase tracking-widest">Data</span>
            </Link>
          </div>
        </aside>

        {children}

        {/* Brand Footer */}
        <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#050508] border-t border-border-dim md:pl-28 relative z-20">
          <div className="flex flex-col gap-2 mb-6 md:mb-0 items-center md:items-start">
            <div className="font-extrabold text-text-primary tracking-widest font-display-lg uppercase text-lg">
              M_ZOHAIB<span className="text-accent-chartreuse">.DEV</span>
            </div>
            <div className="font-code-sm text-[10px] text-text-muted uppercase tracking-wider text-center md:text-left">
              © 2026 Muhammad Zohaib Zahid · Built with precision
            </div>
          </div>
          
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <p className="font-display-lg font-bold text-[11px] text-text-primary tracking-wider uppercase">CONNECT</p>
              <div className="flex gap-6">
                <a className="font-code-sm text-[10px] text-text-muted hover:text-accent-chartreuse transition-all uppercase tracking-wider flex items-center gap-1" href="https://github.com/Malik-Zohaib-Debug" target="_blank" rel="noreferrer">GitHub <span className="material-symbols-outlined text-[10px]">open_in_new</span></a>
                <a className="font-code-sm text-[10px] text-text-muted hover:text-accent-chartreuse transition-all uppercase tracking-wider flex items-center gap-1" href="https://www.linkedin.com/in/zohaib-zahid-malik" target="_blank" rel="noreferrer">LinkedIn <span className="material-symbols-outlined text-[10px]">open_in_new</span></a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
