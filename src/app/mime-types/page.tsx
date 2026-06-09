"use client";
import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const mimeDb: [string, string, string][] = [
  [".html", "text/html", "HTML document"],
  [".css", "text/css", "Stylesheet"],
  [".js", "application/javascript", "JavaScript"],
  [".json", "application/json", "JSON data"],
  [".xml", "application/xml", "XML document"],
  [".txt", "text/plain", "Plain text"],
  [".csv", "text/csv", "CSV data"],
  [".pdf", "application/pdf", "PDF document"],
  [".png", "image/png", "PNG image"],
  [".jpg", "image/jpeg", "JPEG image"],
  [".jpeg", "image/jpeg", "JPEG image"],
  [".gif", "image/gif", "GIF image"],
  [".svg", "image/svg+xml", "SVG image"],
  [".webp", "image/webp", "WebP image"],
  [".ico", "image/x-icon", "Icon file"],
  [".mp3", "audio/mpeg", "MP3 audio"],
  [".wav", "audio/wav", "WAV audio"],
  [".ogg", "audio/ogg", "OGG audio"],
  [".mp4", "video/mp4", "MP4 video"],
  [".webm", "video/webm", "WebM video"],
  [".avi", "video/x-msvideo", "AVI video"],
  [".zip", "application/zip", "ZIP archive"],
  [".gz", "application/gzip", "Gzip archive"],
  [".tar", "application/x-tar", "Tar archive"],
  [".woff", "font/woff", "WOFF font"],
  [".woff2", "font/woff2", "WOFF2 font"],
  [".ttf", "font/ttf", "TrueType font"],
  [".eot", "application/vnd.ms-fontobject", "EOT font"],
  [".md", "text/markdown", "Markdown document"],
  [".yaml", "application/x-yaml", "YAML data"],
  [".yml", "application/x-yaml", "YAML data"],
  [".ts", "application/typescript", "TypeScript"],
  [".tsx", "application/typescript", "TypeScript JSX"],
  [".jsx", "text/jsx", "JSX"],
  [".graphql", "application/graphql", "GraphQL"],
  [".wasm", "application/wasm", "WebAssembly"],
  [".sql", "application/sql", "SQL"],
  [".sh", "application/x-sh", "Shell script"],
  [".bat", "application/x-bat", "Batch file"],
  [".env", "text/plain", "Environment file"],
];

export default function MimeTypes() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return mimeDb;
    const q = query.toLowerCase();
    return mimeDb.filter(([ext, mime, desc]) => ext.includes(q) || mime.toLowerCase().includes(q) || desc.toLowerCase().includes(q));
  }, [query]);

  return (
    <ToolLayout slug="mime-types">
      <div className="mb-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-blue-500 outline-none transition-colors"
            placeholder="Search by extension or MIME type..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-x-3 p-2.5 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-400 border-b border-gray-200 dark:border-gray-700">
          <span className="w-16">Extension</span>
          <span>MIME Type</span>
          <span>Description</span>
          <span className="w-12"></span>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filtered.map(([ext, mime, desc]) => (
            <div key={ext} className="grid grid-cols-[auto_1fr_1fr_auto] gap-x-3 px-2.5 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50 text-sm items-center">
              <code className="w-16 font-mono text-xs text-blue-600 dark:text-blue-400">{ext}</code>
              <code className="font-mono text-xs truncate">{mime}</code>
              <span className="text-xs text-gray-400 truncate">{desc}</span>
              <CopyButton text={mime} label="Copy" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-400">{filtered.length} types</div>
    </ToolLayout>
  );
}
