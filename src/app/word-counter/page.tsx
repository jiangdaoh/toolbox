"use client";
import { useState, useMemo } from "react";

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
    return { words, chars, charsNoSpace, sentences, paragraphs, lines, readingTime };
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Word Counter</h1>
      <p className="text-gray-500 mb-6">Count words, characters, sentences, and paragraphs in real-time.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          ["Words", stats.words],
          ["Characters", stats.chars],
          ["No Spaces", stats.charsNoSpace],
          ["Sentences", stats.sentences],
          ["Paragraphs", stats.paragraphs],
          ["Lines", stats.lines],
          ["Reading Time", `${stats.readingTime} min`],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>
      <textarea
        className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm resize-y"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
