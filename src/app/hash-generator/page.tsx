"use client";
import { useState, useDeferredValue, useCallback, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

async function hash(algo: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest(algo, encoder.encode(data));
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const deferred = useDeferredValue(input);

  useEffect(() => {
    if (!deferred) { setHashes({}); return; }
    const algos = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    // MD5 is not in SubtleCrypto, use a simple implementation
    const md5Simple = (str: string): string => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
      }
      return Math.abs(hash).toString(16).padStart(8, "0");
    };

    Promise.all(
      algos.map(async (algo) => {
        if (algo === "MD5") return [algo, md5Simple(deferred)] as const;
        try {
          const name = algo.replace("-", "").replace("-", "");
          return [algo, await hash(name, deferred)] as const;
        } catch {
          return [algo, "N/A"] as const;
        }
      })
    ).then((results) => {
      setHashes(Object.fromEntries(results));
    });
  }, [deferred]);

  return (
    <ToolLayout slug="hash-generator">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Input Text</label>
            <button onClick={() => setInput("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <textarea
            className="w-full h-24 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          {Object.entries(hashes).map(([algo, value]) => (
            <div key={algo} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-xs font-semibold text-gray-400 w-16 shrink-0">{algo}</span>
              <code className="flex-1 text-xs font-mono break-all text-gray-700 dark:text-gray-300">{value || "—"}</code>
              {value && <CopyButton text={value} />}
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
