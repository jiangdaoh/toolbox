"use client";
import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

function parseUA(ua: string) {
  const result: Record<string, string> = { "User Agent": ua };

  // Browser
  const chrome = ua.match(/Chrome\/([\d.]+)/);
  const firefox = ua.match(/Firefox\/([\d.]+)/);
  const safari = ua.match(/Version\/([\d.]+).*Safari/);
  const edge = ua.match(/Edg\/([\d.]+)/);
  if (edge) result["Browser"] = `Microsoft Edge ${edge[1]}`;
  else if (chrome) result["Browser"] = `Google Chrome ${chrome[1]}`;
  else if (firefox) result["Browser"] = `Mozilla Firefox ${firefox[1]}`;
  else if (safari) result["Browser"] = `Safari ${safari[1]}`;

  // OS
  const win = ua.match(/Windows NT ([\d.]+)/);
  const mac = ua.match(/Mac OS X ([\d_.]+)/);
  const linux = ua.match(/Linux/);
  const android = ua.match(/Android ([\d.]+)/);
  const ios = ua.match(/iPhone OS ([\d_]+)/);
  if (win) result["OS"] = `Windows ${win[1]}`;
  else if (mac) result["OS"] = `macOS ${mac[1].replace(/_/g, ".")}`;
  else if (android) result["OS"] = `Android ${android[1]}`;
  else if (ios) result["OS"] = `iOS ${ios[1].replace(/_/g, ".")}`;
  else if (linux) result["OS"] = "Linux";

  // Device
  if (/Mobile/.test(ua)) result["Device"] = "Mobile";
  else if (/Tablet/.test(ua)) result["Device"] = "Tablet";
  else result["Device"] = "Desktop";

  // Engine
  if (ua.includes("Gecko")) result["Engine"] = "Gecko";
  else if (ua.includes("AppleWebKit")) result["Engine"] = "WebKit";
  else if (ua.includes("Blink")) result["Engine"] = "Blink";

  return result;
}

export default function UserAgentParser() {
  const [input, setInput] = useState("");
  const [currentUA, setCurrentUA] = useState("");

  useEffect(() => {
    setCurrentUA(navigator.userAgent);
  }, []);

  const ua = input || currentUA;
  const parsed = ua ? parseUA(ua) : {};

  return (
    <ToolLayout slug="user-agent">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">User Agent String</label>
            <button onClick={() => setInput("")} className="text-xs text-gray-400 hover:text-gray-600">Use My UA</button>
          </div>
          <textarea
            className="w-full h-20 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm resize-y focus:border-blue-500 outline-none transition-colors"
            placeholder="Paste a user agent string or leave empty to use yours..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        {Object.keys(parsed).length > 0 && (
          <div className="space-y-2">
            {Object.entries(parsed).map(([key, val]) => (
              <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-400 w-20 shrink-0">{key}</span>
                <span className="text-sm break-all">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
