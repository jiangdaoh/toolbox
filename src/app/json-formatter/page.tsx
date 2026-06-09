"use client";
import { useState, useCallback, useDeferredValue } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const deferredInput = useDeferredValue(input);

  const result = useCallback(() => {
    if (!deferredInput.trim()) return { output: "", error: "" };
    try {
      const parsed = JSON.parse(deferredInput);
      return { output: JSON.stringify(parsed, null, indent), error: "" };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [deferredInput, indent]);

  const { output, error } = result();

  const minified = useCallback(() => {
    try { return JSON.stringify(JSON.parse(deferredInput)); } catch { return ""; }
  }, [deferredInput]);

  return (
    <ToolLayout slug="json-formatter">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Input</label>
            <button onClick={() => setInput("")} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">Clear</button>
          </div>
          <textarea
            className="w-full h-80 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors"
            placeholder='{"key": "value", "array": [1, 2, 3]}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Output</label>
            <div className="flex items-center gap-2">
              <select
                className="text-xs border border-gray-200 dark:border-gray-700 rounded px-1.5 py-1 bg-white dark:bg-gray-900"
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>1 space</option>
              </select>
              <CopyButton text={output || minified()} />
            </div>
          </div>
          <textarea
            className={`w-full h-80 p-3 rounded-lg border text-sm resize-y outline-none transition-colors ${
              error
                ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            }`}
            value={error ? `Error: ${error}` : output}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>
      {output && (
        <div className="flex gap-2 mt-3">
          <CopyButton text={JSON.stringify(JSON.parse(input))} label="Copy Minified" />
        </div>
      )}
    </ToolLayout>
  );
}
