"use client";
import { useState, useCallback } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(1);

  const generate = useCallback(() => {
    let chars = "";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useDigits) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;

    const passwords: string[] = [];
    for (let n = 0; n < count; n++) {
      let pw = "";
      const arr = new Uint32Array(length);
      crypto.getRandomValues(arr);
      for (let i = 0; i < length; i++) pw += chars[arr[i] % chars.length];
      passwords.push(pw);
    }
    setPassword(passwords.join("\n"));
  }, [length, useUpper, useLower, useDigits, useSymbols, count]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Password Generator</h1>
      <p className="text-gray-500 mb-6">Generate strong, secure random passwords using crypto-grade randomness.</p>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Length: {length}</label>
          <input type="range" min={4} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> Uppercase</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} /> Lowercase</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useDigits} onChange={(e) => setUseDigits(e.target.checked)} /> Digits</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} /> Symbols</label>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Count:</label>
          <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm" />
        </div>
        <div className="flex gap-3">
          <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Generate</button>
          <button onClick={() => navigator.clipboard.writeText(password)} className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Copy</button>
        </div>
      </div>
      {password && (
        <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm whitespace-pre-wrap break-all">{password}</pre>
      )}
    </div>
  );
}
