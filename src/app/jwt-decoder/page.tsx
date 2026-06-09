"use client";
import { useState, useDeferredValue, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (str.length % 4)) % 4);
  return decodeURIComponent(escape(atob(padded)));
}

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const deferred = useDeferredValue(input);

  const data = useMemo(() => {
    if (!deferred.trim()) return null;
    const parts = deferred.trim().split(".");
    if (parts.length !== 3) return { error: "Invalid JWT: expected 3 parts separated by dots" };
    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      const exp = payload.exp ? new Date(payload.exp * 1000) : null;
      const iat = payload.iat ? new Date(payload.iat * 1000) : null;
      const isExpired = exp ? exp.getTime() < Date.now() : null;
      return { header, payload, exp, iat, isExpired, error: "" };
    } catch (e) {
      return { error: `Decode error: ${(e as Error).message}` };
    }
  }, [deferred]);

  return (
    <ToolLayout slug="jwt-decoder">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Paste your JWT</label>
            <button onClick={() => setInput("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <textarea
            className="w-full h-24 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm resize-y focus:border-blue-500 outline-none transition-colors"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {data && !data.error && (
          <div className="space-y-3">
            {data.isExpired !== null && (
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${data.isExpired ? "bg-red-50 dark:bg-red-900/20 text-red-600" : "bg-green-50 dark:bg-green-900/20 text-green-600"}`}>
                {data.isExpired ? "Token is expired" : "Token is valid"}
              </div>
            )}
            {[
              ["Header", data.header],
              ["Payload", data.payload],
            ].map(([label, obj]) => (
              <div key={label as string}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-500">{label as string}</label>
                  <CopyButton text={JSON.stringify(obj, null, 2)} />
                </div>
                <pre className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(obj, null, 2)}
                </pre>
              </div>
            ))}
            <div className="flex gap-4 text-xs text-gray-400">
              {data.iat && <span>Issued: {data.iat.toLocaleString()}</span>}
              {data.exp && <span>Expires: {data.exp.toLocaleString()}</span>}
            </div>
          </div>
        )}

        {data?.error && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{data.error}</div>
        )}
      </div>
    </ToolLayout>
  );
}
