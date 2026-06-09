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

  const newTools = tools.filter((t) => t.new);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Free Online <span className="text-blue-600 dark:text-blue-400">Developer Tools</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-6">
          Fast, free, and privacy-focused tools that run entirely in your browser. No data sent to servers.
        </p>
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
            placeholder="Search tools... (⌘K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !activeCategory
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All Tools
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* New tools banner */}
      {!query && !activeCategory && newTools.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">New Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {newTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group flex items-center gap-3 p-3 rounded-lg border border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/10 hover:border-green-400 dark:hover:border-green-600 transition-colors"
              >
                <span className="text-xl">{tool.icon}</span>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate group-hover:text-green-700 dark:group-hover:text-green-300">{tool.name}</div>
                  <div className="text-xs text-gray-400 truncate">{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tool grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-500/5 transition-all"
          >
            <span className="text-2xl mt-0.5">{tool.icon}</span>
            <div className="min-w-0">
              <div className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-2">
                {tool.name}
                {tool.new && (
                  <span className="text-[10px] bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded-full font-medium">NEW</span>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-0.5 line-clamp-2">{tool.description}</div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg mb-2">No tools found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      )}

      {/* Features */}
      <section className="mt-16 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { title: "Privacy First", desc: "All processing happens in your browser. No data is ever sent to our servers.", icon: "🔒" },
            { title: "Free Forever", desc: "All tools are completely free with no limits. No signup or email required.", icon: "✨" },
            { title: "Lightning Fast", desc: "Built with modern web technologies for instant results. No page reloads.", icon: "⚡" },
          ].map((f) => (
            <div key={f.title} className="p-4">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
