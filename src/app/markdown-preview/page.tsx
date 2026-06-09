"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const defaultMd = `# Hello World

## Features
- **Bold** and *italic* text
- [Links](https://example.com)
- \`inline code\`
- ~~strikethrough~~

### Code Block
\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`

> This is a blockquote with **bold** text.

### Table
| Feature | Status |
|---------|--------|
| Bold    | ✅     |
| Italic  | ✅     |
| Code    | ✅     |
| Tables  | ✅     |

### Checklist
- [x] Task one
- [ ] Task two
- [ ] Task three
`;

function mdToHtml(md: string): string {
  let html = md
    // Code blocks (must be first)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 rounded p-3 overflow-x-auto text-sm my-3"><code>$2</code></pre>')
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    // Inline formatting
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/~~(.*?)~~/gim, '<del>$1</del>')
    .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="max-w-full rounded" />')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-500 my-2">$1</blockquote>')
    // Checkboxes
    .replace(/^- \[x\] (.*$)/gim, '<div class="flex items-center gap-2"><input type="checkbox" checked disabled class="accent-blue-600" /> $1</div>')
    .replace(/^- \[ \] (.*$)/gim, '<div class="flex items-center gap-2"><input type="checkbox" disabled /> $1</div>')
    // Lists
    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    // Horizontal rule
    .replace(/^---$/gim, '<hr class="border-gray-200 dark:border-gray-700 my-4" />')
    // Paragraphs
    .replace(/\n\n/gim, '</p><p class="my-2">')
    .replace(/\n/gim, "<br/>");

  // Tables
  html = html.replace(/(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|<br\/>?)*)/g, (_, header, sep, body) => {
    const headers = header.split("|").filter((c: string) => c.trim());
    const rows = body.split("<br/>").filter((r: string) => r.trim());
    let table = '<table class="w-full border-collapse my-3 text-sm"><thead><tr>';
    headers.forEach((h: string) => { table += `<th class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-left bg-gray-50 dark:bg-gray-800">${h.trim()}</th>`; });
    table += "</tr></thead><tbody>";
    rows.forEach((row: string) => {
      const cells = row.split("|").filter((c: string) => c.trim());
      table += "<tr>";
      cells.forEach((c: string) => { table += `<td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5">${c.trim()}</td>`; });
      table += "</tr>";
    });
    table += "</tbody></table>";
    return table;
  });

  return `<p class="my-2">${html}</p>`;
}

export default function MarkdownPreview() {
  const [md, setMd] = useState(defaultMd);

  return (
    <ToolLayout slug="markdown-preview">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Markdown</label>
            <button onClick={() => setMd("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <textarea
            className="w-full h-[28rem] p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none transition-colors font-mono leading-relaxed"
            value={md}
            onChange={(e) => setMd(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Preview</label>
          <div
            className="w-full h-[28rem] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-auto prose prose-sm dark:prose-invert max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: mdToHtml(md) }}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
