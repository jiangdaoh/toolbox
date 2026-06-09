"use client";
import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

function diffLines(a: string, b: string): { type: "same" | "added" | "removed"; text: string }[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const result: { type: "same" | "added" | "removed"; text: string }[] = [];
  const maxLen = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < maxLen; i++) {
    const la = linesA[i];
    const lb = linesB[i];
    if (la === undefined) result.push({ type: "added", text: lb });
    else if (lb === undefined) result.push({ type: "removed", text: la });
    else if (la === lb) result.push({ type: "same", text: la });
    else {
      result.push({ type: "removed", text: la });
      result.push({ type: "added", text: lb });
    }
  }
  return result;
}

export default function TextDiff() {
  const [textA, setTextA] = useState("Hello World\nThis is line 2\nThis is line 3\nUnchanged line");
  const [textB, setTextB] = useState("Hello World\nThis is line 2 modified\nThis is line 3\nUnchanged line\nNew line added");

  const diff = useMemo(() => diffLines(textA, textB), [textA, textB]);
  const stats = useMemo(() => {
    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    return { added, removed };
  }, [diff]);

  return (
    <ToolLayout slug="text-diff">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Original Text</label>
          <textarea className="w-full h-40 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none font-mono" value={textA} onChange={(e) => setTextA(e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Modified Text</label>
          <textarea className="w-full h-40 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none font-mono" value={textB} onChange={(e) => setTextB(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-3 text-xs">
        <span className="text-green-600">+{stats.added} added</span>
        <span className="text-red-500">-{stats.removed} removed</span>
      </div>
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <pre className="text-sm font-mono overflow-x-auto">
          {diff.map((line, i) => (
            <div key={i} className={`px-3 py-0.5 ${
              line.type === "added" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" :
              line.type === "removed" ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" :
              "bg-white dark:bg-gray-900"
            }`}>
              <span className="w-8 inline-block text-gray-400 select-none text-right mr-3">{i + 1}</span>
              <span className="w-4 inline-block select-none mr-1">
                {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
              </span>
              {line.text}
            </div>
          ))}
        </pre>
      </div>
    </ToolLayout>
  );
}
