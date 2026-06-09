"use client";
import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

const presets = [
  { name: "Email", pattern: "[\\w.-]+@[\\w.-]+\\.\\w+", flags: "g" },
  { name: "URL", pattern: "https?://[\\w\\-._~:/?#\\[\\]@!$&'()*+,;=]+", flags: "gi" },
  { name: "IPv4", pattern: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b", flags: "g" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}", flags: "g" },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testStr) return { matches: [], error: "", highlighted: testStr };
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const matches: { match: string; index: number; groups?: string[] }[] = [];
      let m: RegExpExecArray | null;
      while ((m = re.exec(testStr)) !== null) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (!flags.includes("g")) break;
        if (m[0].length === 0) { re.lastIndex++; }
      }
      return { matches, error: "", highlighted: testStr };
    } catch (e) {
      return { matches: [], error: (e as Error).message, highlighted: testStr };
    }
  }, [pattern, flags, testStr]);

  return (
    <ToolLayout slug="regex-tester">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Pattern</label>
            <div className="flex gap-1">
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => { setPattern(p.pattern); setFlags(p.flags); }}
                  className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 focus-within:border-blue-500 transition-colors">
            <span className="pl-3 text-gray-400 font-mono text-sm">/</span>
            <input
              className="flex-1 py-2.5 px-1 bg-transparent font-mono text-sm outline-none"
              placeholder="Enter regex pattern..."
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
            <span className="text-gray-400 font-mono text-sm">/</span>
            <input
              className="w-12 py-2.5 pr-3 bg-transparent font-mono text-sm outline-none text-blue-600 dark:text-blue-400"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Test String</label>
            <button onClick={() => setTestStr("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <textarea
            className="w-full h-32 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none transition-colors font-mono"
            placeholder="Enter test string..."
            value={testStr}
            onChange={(e) => setTestStr(e.target.value)}
          />
        </div>
        {result.error && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{result.error}</div>
        )}
        {result.matches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Matches</h3>
              <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">{result.matches.length} found</span>
            </div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {result.matches.slice(0, 100).map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900 rounded text-sm">
                  <span className="text-gray-400 w-10 text-right text-xs">#{i + 1}</span>
                  <code className="font-mono bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded text-xs">{m.match}</code>
                  <span className="text-gray-400 text-xs">idx: {m.index}</span>
                  {m.groups && m.groups.length > 0 && m.groups.map((g, j) => (
                    <code key={j} className="font-mono bg-blue-100 dark:bg-blue-900/30 px-1 py-0.5 rounded text-xs">{g}</code>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        {pattern && testStr && !result.error && result.matches.length === 0 && (
          <div className="text-sm text-gray-400 text-center py-4">No matches found</div>
        )}
      </div>
    </ToolLayout>
  );
}
