"use client";
import { useState, useEffect } from "react";

export default function TimestampConverter() {
  const [now, setNow] = useState(Date.now());
  const [inputTs, setInputTs] = useState("");
  const [inputDate, setInputDate] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tsToDate = (ts: string) => {
    const ms = ts.length === 10 ? Number(ts) * 1000 : Number(ts);
    const d = new Date(ms);
    if (isNaN(d.getTime())) return "Invalid timestamp";
    return d.toISOString();
  };

  const dateToTs = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid date";
    return Math.floor(d.getTime() / 1000).toString();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Timestamp Converter</h1>
      <p className="text-gray-500 mb-6">Convert between Unix timestamps and human-readable dates.</p>
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 mb-6 text-center">
        <div className="text-sm text-gray-500">Current Unix Timestamp</div>
        <div className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">{Math.floor(now / 1000)}</div>
        <div className="text-sm text-gray-400 mt-1">{new Date(now).toISOString()}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="font-semibold">Timestamp → Date</h2>
          <input className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-mono bg-gray-50 dark:bg-gray-900" placeholder="Enter Unix timestamp..." value={inputTs} onChange={(e) => setInputTs(e.target.value)} />
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm font-mono">{inputTs ? tsToDate(inputTs) : "—"}</div>
        </div>
        <div className="space-y-3">
          <h2 className="font-semibold">Date → Timestamp</h2>
          <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm font-mono">{inputDate ? dateToTs(inputDate) : "—"}</div>
        </div>
      </div>
    </div>
  );
}
