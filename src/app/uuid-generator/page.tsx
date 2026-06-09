"use client";
import { useState, useCallback, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function uuidV4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & (c === "x" ? 15 : 3)) | (c === "x" ? 0 : 8);
    return r.toString(16);
  });
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<"standard" | "no-dash" | "upper">("standard");

  const generate = useCallback(() => {
    const result = Array.from({ length: count }, () => {
      const uuid = uuidV4();
      if (format === "no-dash") return uuid.replace(/-/g, "");
      if (format === "upper") return uuid.toUpperCase();
      return uuid;
    });
    setUuids(result);
  }, [count, format]);

  useEffect(() => { generate(); }, [generate]);

  return (
    <ToolLayout slug="uuid-generator">
      <div className="space-y-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Count</label>
            <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value as "standard" | "no-dash" | "upper")} className="px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
              <option value="standard">Standard</option>
              <option value="no-dash">No Dashes</option>
              <option value="upper">Uppercase</option>
            </select>
          </div>
          <div className="self-end">
            <button onClick={generate} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">Generate</button>
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        {uuids.map((uuid, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <code className="flex-1 text-sm font-mono select-all">{uuid}</code>
            <CopyButton text={uuid} />
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
