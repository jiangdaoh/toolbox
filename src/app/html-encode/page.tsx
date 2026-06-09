"use client";
import { useState, useDeferredValue, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const reverseEntities: Record<string, string> = Object.fromEntries(Object.entries(entities).map(([k, v]) => [v, k]));

export default function HtmlEncode() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const deferredInput = useDeferredValue(input);

  const output = useCallback(() => {
    if (!deferredInput) return "";
    if (mode === "encode") {
      return deferredInput.replace(/[&<>"']/g, (c) => entities[c] || c);
    }
    return deferredInput.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (m) => reverseEntities[m] || m);
  }, [deferredInput, mode]);

  return (
    <ToolLayout slug="html-encode">
      <div className="flex gap-1 mb-4">
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
            {m === "encode" ? "Encode" : "Decode"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Input</label>
            <button onClick={() => setInput("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <textarea className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none transition-colors" value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter HTML to encode..." : "Enter encoded HTML..."} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Output</label>
            <CopyButton text={output()} />
          </div>
          <textarea className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y" value={output()} readOnly />
        </div>
      </div>
    </ToolLayout>
  );
}
