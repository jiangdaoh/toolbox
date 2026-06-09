"use client";
import { useState, useMemo } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testStr) return { matches: [], error: "" };
    try {
      const regex = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups?: string[] }[] = [];
      let m: RegExpExecArray | null;
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((m = re.exec(testStr)) !== null) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (!flags.includes("g")) break;
      }
      return { matches, error: "" };
    } catch (e) {
      return { matches: [], error: (e as Error).message };
    }
  }, [pattern, flags, testStr]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Regex Tester</h1>
      <p className="text-gray-500 mb-6">Test and debug regular expressions online with real-time matching.</p>
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
            <span className="px-2 text-gray-400 font-mono">/</span>
            <input className="flex-1 py-2 pr-2 bg-transparent font-mono text-sm outline-none" placeholder="Enter regex pattern..." value={pattern} onChange={(e) => setPattern(e.target.value)} />
            <span className="px-2 text-gray-400 font-mono">/</span>
            <input className="w-12 py-2 pr-2 bg-transparent font-mono text-sm outline-none" value={flags} onChange={(e) => setFlags(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Test String</label>
          <textarea className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 font-mono text-sm resize-y" value={testStr} onChange={(e) => setTestStr(e.target.value)} placeholder="Enter test string..." />
        </div>
        {result.error && <div className="text-red-500 text-sm">Error: {result.error}</div>}
        {result.matches.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Matches ({result.matches.length})</h3>
            <div className="space-y-2">
              {result.matches.slice(0, 50).map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900 rounded text-sm">
                  <span className="text-gray-400 w-16 text-right">#{i + 1}</span>
                  <span className="font-mono bg-yellow-100 dark:bg-yellow-900 px-1 rounded">{m.match}</span>
                  <span className="text-gray-400">index: {m.index}</span>
                  {m.groups && m.groups.length > 0 && (
                    <span className="text-gray-400">groups: [{m.groups.map((g, j) => <span key={j} className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded mx-1">{g}</span>)}]</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
