"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Pause,
  Play,
} from "lucide-react";
import { isSafeExternalHref, type BlogPost } from "@/data/blogPosts";

const AUTOPLAY_MS = 6000;

const accentStyles: Record<BlogPost["accent"], { border: string; tag: string; bar: string }> = {
  chartreuse: {
    border: "hover:border-accent-chartreuse/30",
    tag: "bg-tag-bg text-accent-chartreuse",
    bar: "bg-accent-chartreuse",
  },
  purple: {
    border: "hover:border-accent-purple/30",
    tag: "bg-accent-purple/10 text-accent-purple",
    bar: "bg-accent-purple",
  },
  orange: {
    border: "hover:border-accent-orange/30",
    tag: "bg-accent-orange/10 text-accent-orange",
    bar: "bg-accent-orange",
  },
};

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogCarousel({ posts }: { posts: BlogPost[] }) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);

  const count = posts.length;
  const canNavigate = count > 1;
  const autoplay =
    canNavigate && !reducedMotion && !userPaused && !hoverPaused && !focusPaused;

  const go = useCallback(
    (step: number) => {
      if (count < 2) return;
      setDirection(step);
      setIndex((i) => (i + step + count) % count);
    },
    [count],
  );

  const goTo = (target: number) => {
    setDirection(target >= index ? 1 : -1);
    setIndex(target);
  };

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [autoplay, go, index]);

  if (count === 0) return null;

  const safeIndex = Math.min(index, count - 1);
  const post = posts[safeIndex];
  const style = accentStyles[post.accent] ?? accentStyles.chartreuse;
  const href = isSafeExternalHref(post.href) ? post.href : undefined;

  const offset = reducedMotion ? 0 : 40;

  const cardBody = (
    <>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
        <span className={`px-2.5 py-1 rounded text-[11px] font-code-sm tracking-wider uppercase ${style.tag}`}>
          {post.category}
        </span>
        <time
          dateTime={post.date}
          className="font-code-sm text-[12px] text-text-muted"
        >
          {formatDate(post.date)}
        </time>
        <span className="font-code-sm text-[12px] text-text-muted flex items-center gap-1.5">
          <Clock size={12} aria-hidden="true" />
          {post.readTime}
        </span>
      </div>

      <h3 className="font-display-lg font-bold text-[22px] sm:text-[28px] text-text-primary leading-tight mb-4">
        {post.title}
      </h3>
      <p className="font-body-base text-[15px] text-text-muted font-light leading-relaxed max-w-[720px] mb-6">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded bg-white/5 border border-border-dim text-[11px] font-code-sm text-text-muted"
          >
            {tag}
          </span>
        ))}
        {href && (
          <span className="ml-auto flex items-center gap-1 font-code-sm text-[12px] uppercase tracking-wider text-accent-chartreuse">
            Read <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  const cardClass = `block glass-panel p-6 sm:p-10 rounded border border-border-dim transition-all duration-300 ${style.border}`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Blog posts"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setFocusPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocusPaused(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        else if (e.key === "ArrowRight") go(1);
      }}
    >
      <div
        className="relative overflow-hidden"
        aria-live={autoplay ? "off" : "polite"}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={post.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${safeIndex + 1} of ${count}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * offset }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
          >
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} cursor-pointer`}
              >
                {cardBody}
              </a>
            ) : (
              <article className={cardClass}>{cardBody}</article>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {canNavigate && (
        <div className="flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-2">
            {posts.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to post ${i + 1}: ${p.title}`}
                aria-current={i === safeIndex ? "true" : undefined}
                className="p-2 cursor-pointer group"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-300 ${
                    i === safeIndex
                      ? `w-8 ${style.bar}`
                      : "w-4 bg-border-medium group-hover:bg-text-muted"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((v) => !v)}
                aria-label={userPaused ? "Start autoplay" : "Pause autoplay"}
                className="w-10 h-10 flex items-center justify-center rounded border border-border-dim text-text-muted hover:text-accent-chartreuse hover:border-accent-chartreuse/30 transition-colors cursor-pointer"
              >
                {userPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            )}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous post"
              className="w-10 h-10 flex items-center justify-center rounded border border-border-dim text-text-muted hover:text-accent-chartreuse hover:border-accent-chartreuse/30 transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next post"
              className="w-10 h-10 flex items-center justify-center rounded border border-border-dim text-text-muted hover:text-accent-chartreuse hover:border-accent-chartreuse/30 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
