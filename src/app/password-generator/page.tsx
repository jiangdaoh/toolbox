"use client";
import { useState, useCallback, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generate = useCallback(() => {
    let chars = "";
    const upper = excludeAmbiguous ? "ABCDEFGHJKMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = excludeAmbiguous ? "abcdefghjkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
    const digits = excludeAmbiguous ? "23456789" : "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useDigits) chars += digits;
    if (useSymbols) chars += symbols;
    if (!chars) chars = lower + digits;

    const result: string[] = [];
    for (let n = 0; n < 5; n++) {
      let pw = "";
      const arr = new Uint32Array(length);
      crypto.getRandomValues(arr);
      for (let i = 0; i < length; i++) pw += chars[arr[i] % chars.length];
      result.push(pw);
    }
    setPasswords(result);
  }, [length, useUpper, useLower, useDigits, useSymbols, excludeAmbiguous]);

  useEffect(() => { generate(); }, [generate]);

  const strength = length >= 20 && useSymbols ? "Strong" : length >= 12 ? "Medium" : "Weak";
  const strengthColor = strength === "Strong" ? "text-green-500" : strength === "Medium" ? "text-yellow-500" : "text-red-500";

  return (
    <ToolLayout slug="password-generator">
      <div className="space-y-4 mb-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Length: {length}</label>
            <span className={`text-xs font-medium ${strengthColor}`}>{strength}</span>
          </div>
          <input type="range" min={4} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {[
            ["Uppercase", useUpper, setUseUpper],
            ["Lowercase", useLower, setUseLower],
            ["Digits", useDigits, setUseDigits],
            ["Symbols", useSymbols, setUseSymbols],
            ["Exclude Ambiguous (0Ol1I)", excludeAmbiguous, setExcludeAmbiguous],
          ].map(([label, checked, setter]) => (
            <label key={label as string} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={checked as boolean} onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)} className="rounded accent-blue-600" />
              {label as string}
            </label>
          ))}
        </div>
        <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
          Regenerate
        </button>
      </div>
      <div className="space-y-2">
        {passwords.map((pw, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <code className="flex-1 text-sm font-mono break-all select-all">{pw}</code>
            <CopyButton text={pw} />
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
