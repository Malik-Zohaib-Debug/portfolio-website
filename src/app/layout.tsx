import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Zohaib Zahid | AI Software Architect",
  description: "Full-Stack Software Developer with 3+ years of experience crafting intelligent ecosystems with high-precision engineering.",
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
      <body className="font-body-base overflow-x-hidden min-h-full flex flex-col">
        {/* TopNavBar */}
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-transparent backdrop-blur-xl border-b border-white/10 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
          <div className="text-xl font-black text-white tracking-widest font-display-lg uppercase">
            M_ZOHAIB.DEV
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="font-['Space_Grotesk'] tracking-tighter uppercase text-xs font-bold text-cyan-400 border-b-2 border-cyan-400 pb-1" href="#">Terminal</a>
            <a className="font-['Space_Grotesk'] tracking-tighter uppercase text-xs font-bold text-gray-400 hover:text-white transition-colors" href="#">Stack</a>
            <a className="font-['Space_Grotesk'] tracking-tighter uppercase text-xs font-bold text-gray-400 hover:text-white transition-colors" href="#">Projects</a>
            <a className="font-['Space_Grotesk'] tracking-tighter uppercase text-xs font-bold text-gray-400 hover:text-white transition-colors" href="#">Log</a>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-r border-white/10 pr-4">
              <a className="nav-social-link text-gray-400 flex items-center" href="https://github.com/Malik-Zohaib-Debug" target="_blank" rel="noreferrer">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
              </a>
              <a className="nav-social-link text-gray-400 flex items-center" href="https://www.linkedin.com/in/zohaib-zahid-malik" target="_blank" rel="noreferrer">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
            <button className="bg-primary-container text-on-primary-container px-4 py-2 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-tighter hover:bg-white active:scale-95 transition-all">
              Deploy_Now
            </button>
          </div>
        </nav>

        {/* SideNavBar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-20 flex flex-col items-center py-8 z-40 bg-[#1A1A1A]/80 backdrop-blur-md border-r border-white/10 hidden md:flex">
          <div className="mb-12 flex flex-col items-center">
            <div className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center border border-primary-container/30 overflow-hidden ring-2 ring-primary-container/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Profile" className="w-full h-full object-cover" src="/zohaib.png" />
            </div>
            <p className="font-['Space_Grotesk'] text-[8px] uppercase tracking-widest text-cyan-400 mt-2">v4.2.0</p>
          </div>
          <div className="flex flex-col gap-8 flex-1">
            <div className="group cursor-pointer flex flex-col items-center gap-1 bg-cyan-400/10 text-cyan-400 border-l-2 border-cyan-400 px-4 py-2">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest">Root</span>
            </div>
            <div className="group cursor-pointer flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-all hover:translate-x-1 duration-200">
              <span className="material-symbols-outlined">source</span>
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest">Source</span>
            </div>
            <div className="group cursor-pointer flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-all hover:translate-x-1 duration-200">
              <span className="material-symbols-outlined">extension</span>
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest">Modules</span>
            </div>
            <div className="group cursor-pointer flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-all hover:translate-x-1 duration-200">
              <span className="material-symbols-outlined">database</span>
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest">Data</span>
            </div>
          </div>
        </aside>

        {children}

        {/* Footer */}
        <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#050505] border-t border-white/5 md:pl-28">
          <div className="flex flex-col gap-2 mb-6 md:mb-0">
            <div className="font-black text-white tracking-widest font-display-lg uppercase text-lg">M_ZOHAIB.DEV</div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-tighter">
              © 2024 MUHAMMAD_ZOHAIB_ZAHID. BUILT_WITH_PRECISION. EXECUTION_TIME: 24ms
            </div>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-4">
              <p className="font-label-caps text-xs text-white tracking-widest">CONNECT</p>
              <div className="flex gap-6">
                <a className="font-mono text-[10px] text-gray-400 hover:text-cyan-400 transition-all uppercase tracking-tighter flex items-center gap-1" href="https://github.com/Malik-Zohaib-Debug" target="_blank" rel="noreferrer">GitHub <span className="material-symbols-outlined text-[10px]">open_in_new</span></a>
                <a className="font-mono text-[10px] text-gray-400 hover:text-cyan-400 transition-all uppercase tracking-tighter flex items-center gap-1" href="https://www.linkedin.com/in/zohaib-zahid-malik" target="_blank" rel="noreferrer">LinkedIn <span className="material-symbols-outlined text-[10px]">open_in_new</span></a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-label-caps text-xs text-white tracking-widest">ACCESS</p>
              <a className="font-mono text-[10px] text-gray-400 hover:text-cyan-400 transition-all uppercase tracking-tighter flex items-center gap-1" href="#">Terminal_Access <span className="material-symbols-outlined text-[10px]">terminal</span></a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
