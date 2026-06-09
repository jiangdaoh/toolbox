(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,38149,e=>{"use strict";var r=e.i(43476),a=e.i(22016),l=e.i(45070);e.s(["default",0,function({slug:e,children:t}){let s=(0,l.getTool)(e);if(!s)return t;let d=l.tools.filter(e=>e.category===s.category&&e.slug!==s.slug).slice(0,4);return(0,r.jsxs)("div",{className:"max-w-5xl mx-auto px-4 py-6",children:[(0,r.jsxs)("div",{className:"mb-6",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2 text-xs text-gray-400 mb-2",children:[(0,r.jsx)(a.default,{href:"/",className:"hover:text-blue-500",children:"Home"}),(0,r.jsx)("span",{children:"/"}),(0,r.jsx)("span",{children:s.category}),(0,r.jsx)("span",{children:"/"}),(0,r.jsx)("span",{className:"text-gray-600 dark:text-gray-300",children:s.name})]}),(0,r.jsx)("h1",{className:"text-2xl md:text-3xl font-bold mb-2",children:s.name}),(0,r.jsx)("p",{className:"text-gray-500 dark:text-gray-400",children:s.description})]}),(0,r.jsx)("div",{className:"rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 md:p-6",children:t}),d.length>0&&(0,r.jsxs)("div",{className:"mt-8",children:[(0,r.jsx)("h2",{className:"text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3",children:"Related Tools"}),(0,r.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:d.map(e=>(0,r.jsxs)(a.default,{href:`/${e.slug}`,className:"flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-sm",children:[(0,r.jsx)("span",{children:e.icon}),(0,r.jsx)("span",{className:"truncate",children:e.name})]},e.slug))})]})]})}])},24939,e=>{"use strict";var r=e.i(43476),a=e.i(71645),l=e.i(38149);let t=`# Hello World

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
`;e.s(["default",0,function(){let e,[s,d]=(0,a.useState)(t);return(0,r.jsx)(l.default,{slug:"markdown-preview",children:(0,r.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-1.5",children:[(0,r.jsx)("label",{className:"text-xs font-medium text-gray-500",children:"Markdown"}),(0,r.jsx)("button",{onClick:()=>d(""),className:"text-xs text-gray-400 hover:text-gray-600",children:"Clear"})]}),(0,r.jsx)("textarea",{className:"w-full h-[28rem] p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none transition-colors font-mono leading-relaxed",value:s,onChange:e=>d(e.target.value),spellCheck:!1})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"text-xs font-medium text-gray-500 mb-1.5 block",children:"Preview"}),(0,r.jsx)("div",{className:"w-full h-[28rem] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-auto prose prose-sm dark:prose-invert max-w-none leading-relaxed",dangerouslySetInnerHTML:{__html:(e=(e=s.replace(/```(\w+)?\n([\s\S]*?)```/g,'<pre class="bg-gray-100 dark:bg-gray-800 rounded p-3 overflow-x-auto text-sm my-3"><code>$2</code></pre>').replace(/^### (.*$)/gim,'<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>').replace(/^## (.*$)/gim,'<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>').replace(/^# (.*$)/gim,'<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>').replace(/\*\*(.*?)\*\*/gim,"<strong>$1</strong>").replace(/\*(.*?)\*/gim,"<em>$1</em>").replace(/~~(.*?)~~/gim,"<del>$1</del>").replace(/`([^`]+)`/gim,'<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>').replace(/\[([^\]]+)\]\(([^)]+)\)/gim,'<a href="$2" class="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener">$1</a>').replace(/!\[([^\]]*)\]\(([^)]+)\)/gim,'<img src="$2" alt="$1" class="max-w-full rounded" />').replace(/^> (.*$)/gim,'<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-500 my-2">$1</blockquote>').replace(/^- \[x\] (.*$)/gim,'<div class="flex items-center gap-2"><input type="checkbox" checked disabled class="accent-blue-600" /> $1</div>').replace(/^- \[ \] (.*$)/gim,'<div class="flex items-center gap-2"><input type="checkbox" disabled /> $1</div>').replace(/^- (.*$)/gim,'<li class="ml-4 list-disc">$1</li>').replace(/^---$/gim,'<hr class="border-gray-200 dark:border-gray-700 my-4" />').replace(/\n\n/gim,'</p><p class="my-2">').replace(/\n/gim,"<br/>")).replace(/(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|<br\/>?)*)/g,(e,r,a,l)=>{let t=r.split("|").filter(e=>e.trim()),s=l.split("<br/>").filter(e=>e.trim()),d='<table class="w-full border-collapse my-3 text-sm"><thead><tr>';return t.forEach(e=>{d+=`<th class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-left bg-gray-50 dark:bg-gray-800">${e.trim()}</th>`}),d+="</tr></thead><tbody>",s.forEach(e=>{let r=e.split("|").filter(e=>e.trim());d+="<tr>",r.forEach(e=>{d+=`<td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5">${e.trim()}</td>`}),d+="</tr>"}),d+="</tbody></table>"}),`<p class="my-2">${e}</p>`).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi,"").replace(/javascript:/gi,"")}})]})]})})}])}]);