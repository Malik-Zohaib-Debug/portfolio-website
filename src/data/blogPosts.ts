export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  accent: "chartreuse" | "purple" | "orange";
  /** Optional outbound link. Must be https and pass isSafeExternalHref. */
  href?: string;
}

/**
 * Accepts only absolute https:// URLs. Rejects anything with leading
 * whitespace/control characters, other schemes, and protocol-relative URLs.
 */
export function isSafeExternalHref(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (/[\u0000- \u007f-\u009f\\]/.test(value)) return false;
  if (!value.startsWith("https://")) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.length > 0;
  } catch {
    return false;
  }
}

export const blogPosts: BlogPost[] = [
  {
    id: "building-agentic-workflows",
    title: "Building Agentic Workflows That Actually Ship",
    excerpt:
      "Lessons from moving LLM agents out of notebooks and into production: tool design, failure budgets, and why evals come before prompts.",
    date: "2026-09-12",
    readTime: "8 min read",
    category: "AI Engineering",
    tags: ["Agents", "LLMs", "Evals"],
    accent: "chartreuse",
  },
  {
    id: "nextjs-app-router-patterns",
    title: "Next.js App Router Patterns I Keep Reaching For",
    excerpt:
      "Server components, streaming boundaries and colocated data: the handful of patterns that keep my React codebases boring in the best way.",
    date: "2026-08-03",
    readTime: "6 min read",
    category: "Frontend",
    tags: ["Next.js", "React", "Architecture"],
    accent: "purple",
  },
  {
    id: "mongodb-schema-design",
    title: "MongoDB Schema Design Beyond the Tutorials",
    excerpt:
      "When to embed, when to reference, and how access patterns, not entity diagrams, should drive every modelling decision.",
    date: "2026-07-18",
    readTime: "7 min read",
    category: "Backend",
    tags: ["MongoDB", "Node.js", "Data Modelling"],
    accent: "orange",
  },
  {
    id: "rag-without-the-hype",
    title: "RAG Without the Hype: What Moves the Needle",
    excerpt:
      "Chunking, retrieval quality and re-ranking matter far more than the vector database you pick. A practical field guide.",
    date: "2026-06-02",
    readTime: "9 min read",
    category: "AI Engineering",
    tags: ["RAG", "Search", "LLMs"],
    accent: "chartreuse",
  },
  {
    id: "type-safe-apis-end-to-end",
    title: "Type-Safe APIs, End to End",
    excerpt:
      "Sharing types between Express and React without a code generator, and the validation layer that keeps them honest at runtime.",
    date: "2026-04-21",
    readTime: "5 min read",
    category: "TypeScript",
    tags: ["TypeScript", "APIs", "Validation"],
    accent: "purple",
  },
];
