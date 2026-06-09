"use client";
import { type ReactNode } from "react";
import Link from "next/link";
import { getTool, tools } from "@/lib/tools";

interface ToolLayoutProps {
  slug: string;
  children: ReactNode;
}

export default function ToolLayout({ slug, children }: ToolLayoutProps) {
  const tool = getTool(slug);
  if (!tool) return children;

  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <span>{tool.category}</span>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300">{tool.name}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{tool.name}</h1>
        <p className="text-gray-500 dark:text-gray-400">{tool.description}</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 md:p-6">
        {children}
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-sm"
              >
                <span>{r.icon}</span>
                <span className="truncate">{r.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
