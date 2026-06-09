"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchTools, type Tool } from "@/lib/tools";

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setResults(query.trim() ? searchTools(query) : []);
    setSelected(0);
  }, [query]);

  const navigate = useCallback(
    (slug: string) => {
      router.push(`/${slug}`);
      setOpen(false);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      navigate(results[selected].slug);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            className="flex-1 py-3 px-3 bg-transparent outline-none text-sm"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="hidden sm:inline-block text-[10px] text-gray-400 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">ESC</kbd>
        </div>
        {results.length > 0 && (
          <ul className="max-h-72 overflow-y-auto py-2">
            {results.map((tool, i) => (
              <li key={tool.slug}>
                <button
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm transition-colors ${
                    i === selected ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => navigate(tool.slug)}
                  onMouseEnter={() => setSelected(i)}
                >
                  <span className="text-lg">{tool.icon}</span>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{tool.name}</div>
                    <div className="text-xs text-gray-400 truncate">{tool.description}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
        {query && results.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-400">No tools found for &ldquo;{query}&rdquo;</div>
        )}
        {!query && (
          <div className="py-8 text-center text-sm text-gray-400">Type to search for tools...</div>
        )}
      </div>
    </div>
  );
}
