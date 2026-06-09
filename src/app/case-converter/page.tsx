"use client";
import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function toWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_.]/g, " ")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

const converters: Record<string, (words: string[]) => string> = {
  camel: (w) => w.map((word, i) => i === 0 ? word : word[0].toUpperCase() + word.slice(1)).join(""),
  pascal: (w) => w.map((word) => word[0].toUpperCase() + word.slice(1)).join(""),
  snake: (w) => w.join("_"),
  "kebab": (w) => w.join("-"),
  "dot": (w) => w.join("."),
  "path": (w) => w.join("/"),
  "upper-snake": (w) => w.join("_").toUpperCase(),
  "upper-kebab": (w) => w.join("-").toUpperCase(),
  "title": (w) => w.map((word) => word[0].toUpperCase() + word.slice(1)).join(" "),
  "sentence": (w) => { const joined = w.join(" "); return joined[0].toUpperCase() + joined.slice(1); },
  "lower": (w) => w.join(" "),
  "upper": (w) => w.join(" ").toUpperCase(),
};

export default function CaseConverter() {
  const [input, setInput] = useState("hello world example text");

  const results = useMemo(() => {
    const words = toWords(input);
    return Object.fromEntries(Object.entries(converters).map(([name, fn]) => [name, fn(words)]));
  }, [input]);

  return (
    <ToolLayout slug="case-converter">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-gray-500">Input</label>
          <button onClick={() => setInput("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
        </div>
        <input className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-blue-500 outline-none transition-colors" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to convert..." />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(results).map(([name, value]) => (
          <div key={name} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{name}</div>
              <code className="text-sm font-mono truncate block select-all">{value || "—"}</code>
            </div>
            {value && <CopyButton text={value} />}
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
