"use client";
import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter((p) => p.trim()).length : 0;
    const lines = text.trim() ? text.split("\n").length : 0;
    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 130);
    return { words, chars, charsNoSpace, sentences, paragraphs, lines, readingTime, speakingTime };
  }, [text]);

  const statItems = [
    ["Words", stats.words],
    ["Characters", stats.chars],
    ["No Spaces", stats.charsNoSpace],
    ["Sentences", stats.sentences],
    ["Paragraphs", stats.paragraphs],
    ["Lines", stats.lines],
    ["Read Time", `${stats.readingTime}m`],
    ["Speak Time", `${stats.speakingTime}m`],
  ] as const;

  return (
    <ToolLayout slug="word-counter">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {statItems.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 text-center">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{value}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-gray-500">Your Text</label>
        <button onClick={() => setText("")} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">Clear</button>
      </div>
      <textarea
        className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none transition-colors"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </ToolLayout>
  );
}
