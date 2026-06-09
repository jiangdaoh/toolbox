"use client";
import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Base64 Encoder / Decoder</h1>
      <p className="text-gray-500 mb-6">Encode and decode Base64 strings online. Supports Unicode.</p>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("encode")} className={`px-4 py-2 rounded-lg text-sm ${mode === "encode" ? "bg-blue-600 text-white" : "border border-gray-300 dark:border-gray-700"}`}>Encode</button>
        <button onClick={() => setMode("decode")} className={`px-4 py-2 rounded-lg text-sm ${mode === "decode" ? "bg-blue-600 text-white" : "border border-gray-300 dark:border-gray-700"}`}>Decode</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input</label>
          <textarea className="w-full h-48 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 font-mono text-sm resize-y" value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Output</label>
          <textarea className="w-full h-48 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 font-mono text-sm resize-y" value={error ? `Error: ${error}` : output} readOnly />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={process} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">{mode === "encode" ? "Encode" : "Decode"}</button>
        <button onClick={() => navigator.clipboard.writeText(output)} className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Copy</button>
      </div>
    </div>
  );
}
