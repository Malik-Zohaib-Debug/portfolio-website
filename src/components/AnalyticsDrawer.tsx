"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface AnalyticsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const analyticsData = {
  total24h: "1,204", // Using a slightly more realistic number while keeping the requested JSON vibe
  activeNow: "277",
  avgSession: "6m 7s", // 367 seconds formatted
  countries: [
    { name: "India", pct: 42 },
    { name: "United States", pct: 8 },
    { name: "Bangladesh", pct: 6 },
    { name: "Pakistan", pct: 5 },
    { name: "Nigeria", pct: 3 },
    { name: "Brazil", pct: 3 },
  ],
  os: [
    { name: "Windows", pct: 63 },
    { name: "Mac", pct: 17 },
    { name: "Android", pct: 10 },
    { name: "GNU/Linux", pct: 5 },
    { name: "iOS", pct: 4 },
  ]
};

export default function AnalyticsDrawer({ isOpen, onClose }: AnalyticsDrawerProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur z-10">
              <h2 className="font-display-lg text-xl tracking-widest text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                LIVE ANALYTICS
              </h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8 flex-grow">
              
              {/* Top Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-lg border border-white/5 flex flex-col justify-center items-center">
                  <span className="text-gray-400 text-xs font-mono mb-2 uppercase tracking-widest">Active Now</span>
                  <span className="text-3xl font-bold text-cyan-400">{analyticsData.activeNow}</span>
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="glass-panel p-3 rounded-lg border border-white/5 flex flex-col justify-center items-center">
                    <span className="text-gray-500 text-[10px] font-mono mb-1 uppercase tracking-widest">24h Visitors</span>
                    <span className="text-xl font-bold text-white">{analyticsData.total24h}</span>
                  </div>
                  <div className="glass-panel p-3 rounded-lg border border-white/5 flex flex-col justify-center items-center">
                    <span className="text-gray-500 text-[10px] font-mono mb-1 uppercase tracking-widest">Avg Session</span>
                    <span className="text-xl font-bold text-white">{analyticsData.avgSession}</span>
                  </div>
                </div>
              </div>

              {/* Countries */}
              <div>
                <h3 className="text-xs font-label-caps text-secondary-fixed mb-4">Top Countries</h3>
                <div className="space-y-4">
                  {analyticsData.countries.map((country, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-gray-300">
                        <span>{country.name}</span>
                        <span>{country.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${country.pct}%` }}
                          transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                          className="h-full bg-cyan-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OS */}
              <div>
                <h3 className="text-xs font-label-caps text-secondary-fixed mb-4">Operating Systems</h3>
                <div className="space-y-4">
                  {analyticsData.os.map((os, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-gray-300">
                        <span>{os.name}</span>
                        <span>{os.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${os.pct}%` }}
                          transition={{ delay: 0.4 + (i * 0.1), duration: 0.8 }}
                          className="h-full bg-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
