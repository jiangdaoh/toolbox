"use client";
import { useState, useDeferredValue, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function UrlEncode() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const deferredInput = useDeferredValue(input);

  const output = useCallback(() => {
    if (!deferredInput) return { text: "", error: "" };
    try {
      return { text: mode === "encode" ? encodeURIComponent(deferredInput) : decodeURIComponent(deferredInput), error: "" };
    } catch (e) {
      return { text: "", error: (e as Error).message };
    }
  }, [deferredInput, mode]);

  const { text, error } = output();

  return (
    <ToolLayout slug="url-encode">
      <div className="flex gap-1 mb-4">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === m ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
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
          <textarea
            className="w-full h-40 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter URL or text..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Output</label>
            <CopyButton text={text} />
          </div>
          <textarea
            className={`w-full h-40 p-3 rounded-lg border text-sm resize-y outline-none ${
              error ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            }`}
            value={error ? `Error: ${error}` : text}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
