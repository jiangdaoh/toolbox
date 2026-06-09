"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { tools, categories, searchTools } from "@/lib/tools";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = query.trim() ? searchTools(query) : tools;
    if (activeCategory) list = list.filter((t) => t.category === activeCategory);
    return list;
  }, [query, activeCategory]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Free Online <span className="text-blue-600 dark:text-blue-400">Developer Tools</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-5">
          Fast, free, and privacy-focused tools that run in your browser.
        </p>
        <input
          className="w-full max-w-md mx-auto block px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm outline-none focus:border-blue-500 transition-colors"
          placeholder="Search tools... (⌘K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !activeCategory ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all"
          >
            <span className="text-2xl mt-0.5">{tool.icon}</span>
            <div className="min-w-0">
              <div className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">{tool.name}</div>
              <div className="text-xs text-gray-400 mt-0.5 line-clamp-2">{tool.description}</div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">No tools found. Try a different search.</div>
      )}
    </div>
  );
}
