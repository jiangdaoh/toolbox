"use client";
import { useState } from "react";

const defaultMd = `# Hello World

## Features
- **Bold** and *italic* text
- [Links](https://example.com)
- \`inline code\`

\`\`\`js
console.log("Hello, World!");
\`\`\`

> Blockquote

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`;

function mdToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 underline">$1</a>')
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-500">$1</blockquote>')
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/gim, "<br/><br/>")
    .replace(/\n/gim, "<br/>");
}

export default function MarkdownPreview() {
  const [md, setMd] = useState(defaultMd);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Markdown Preview</h1>
      <p className="text-gray-500 mb-6">Write and preview Markdown in real-time.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Markdown</label>
          <textarea
            className="w-full h-96 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 font-mono text-sm resize-y"
            value={md}
            onChange={(e) => setMd(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preview</label>
          <div
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 overflow-auto prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: mdToHtml(md) }}
          />
        </div>
      </div>
    </div>
  );
}
