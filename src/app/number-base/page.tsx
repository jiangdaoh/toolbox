"use client";
import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function NumberBaseConverter() {
  const [input, setInput] = useState("255");
  const [base, setBase] = useState(10);

  const results = useMemo(() => {
    const num = parseInt(input, base);
    if (isNaN(num)) return null;
    return {
      binary: num.toString(2),
      octal: num.toString(8),
      decimal: num.toString(10),
      hex: num.toString(16).toUpperCase(),
      base32: num.toString(32),
    };
  }, [input, base]);

  return (
    <ToolLayout slug="number-base">
      <div className="space-y-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Number</label>
            <input className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm focus:border-blue-500 outline-none transition-colors" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a number..." />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Input Base</label>
            <select value={base} onChange={(e) => setBase(Number(e.target.value))} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
              <option value={2}>Binary (2)</option>
              <option value={8}>Octal (8)</option>
              <option value={10}>Decimal (10)</option>
              <option value={16}>Hex (16)</option>
            </select>
          </div>
        </div>
        {results && (
          <div className="space-y-2">
            {[
              ["Binary (Base 2)", results.binary],
              ["Octal (Base 8)", results.octal],
              ["Decimal (Base 10)", results.decimal],
              ["Hexadecimal (Base 16)", results.hex],
              ["Base 32", results.base32],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-400 w-36 shrink-0">{label}</span>
                <code className="flex-1 font-mono text-sm select-all">{value}</code>
                <CopyButton text={value} />
              </div>
            ))}
          </div>
        )}
        {input && !results && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">Invalid number for the selected base</div>
        )}
      </div>
    </ToolLayout>
  );
}
