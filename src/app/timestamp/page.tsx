"use client";
import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

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
    if (isNaN(d.getTime())) return null;
    return {
      iso: d.toISOString(),
      local: d.toLocaleString(),
      utc: d.toUTCString(),
      relative: `${Math.floor((Date.now() - ms) / 86400000)} days ago`,
    };
  };

  const dateToTs = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    return { seconds: Math.floor(d.getTime() / 1000), milliseconds: d.getTime() };
  };

  const dateResult = inputTs ? tsToDate(inputTs) : null;
  const tsResult = inputDate ? dateToTs(inputDate) : null;

  return (
    <ToolLayout slug="timestamp">
      <div className="rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10 p-4 mb-6 text-center">
        <div className="text-xs text-blue-500 mb-1">Current Unix Timestamp</div>
        <div className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">{Math.floor(now / 1000)}</div>
        <div className="text-xs text-gray-400 mt-1">{new Date(now).toISOString()}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Timestamp → Date</h2>
          <input
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter Unix timestamp (e.g. 1700000000)..."
            value={inputTs}
            onChange={(e) => setInputTs(e.target.value)}
          />
          {dateResult && (
            <div className="space-y-2">
              {[
                ["ISO", dateResult.iso],
                ["Local", dateResult.local],
                ["UTC", dateResult.utc],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm">
                  <span className="text-xs text-gray-400 w-12">{label}</span>
                  <span className="font-mono text-xs truncate flex-1 mx-2">{val}</span>
                  <CopyButton text={val} label="Copy" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Date → Timestamp</h2>
          <input
            type="datetime-local"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-blue-500 outline-none transition-colors"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
          />
          {tsResult && (
            <div className="space-y-2">
              {[
                ["Seconds", String(tsResult.seconds)],
                ["Milliseconds", String(tsResult.milliseconds)],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm">
                  <span className="text-xs text-gray-400 w-24">{label}</span>
                  <span className="font-mono text-xs flex-1 mx-2">{val}</span>
                  <CopyButton text={val} label="Copy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
