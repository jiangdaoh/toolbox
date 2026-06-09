"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

function generateLorem(paragraphs: number, sentencesPerPara: number): string {
  const result: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const sentences: string[] = [];
    for (let s = 0; s < sentencesPerPara; s++) {
      const len = 8 + Math.floor(Math.random() * 12);
      const sentence = Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)]);
      sentence[0] = sentence[0][0].toUpperCase() + sentence[0].slice(1);
      sentences.push(sentence.join(" ") + ".");
    }
    result.push(sentences.join(" "));
  }
  return result.join("\n\n");
}

export default function LoremGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(5);
  const [output, setOutput] = useState("");

  const generate = useCallback(() => {
    setOutput(generateLorem(paragraphs, sentences));
  }, [paragraphs, sentences]);

  return (
    <ToolLayout slug="lorem-generator">
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Paragraphs</label>
          <input type="number" min={1} max={20} value={paragraphs} onChange={(e) => setParagraphs(Number(e.target.value))} className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Sentences per paragraph</label>
          <input type="number" min={1} max={20} value={sentences} onChange={(e) => setSentences(Number(e.target.value))} className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm" />
        </div>
        <button onClick={generate} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">Generate</button>
        {output && <CopyButton text={output} />}
      </div>
      {output ? (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{output}</div>
      ) : (
        <div className="text-center py-12 text-gray-400 text-sm">Click Generate to create placeholder text</div>
      )}
    </ToolLayout>
  );
}
