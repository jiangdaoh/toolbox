export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  tags: string[];
  new?: boolean;
}

export const categories = [
  { id: "encoders", name: "Encoders & Decoders", icon: "🔐" },
  { id: "formatters", name: "Formatters", icon: "📐" },
  { id: "generators", name: "Generators", icon: "⚡" },
  { id: "converters", name: "Converters", icon: "🔄" },
  { id: "text", name: "Text Tools", icon: "📝" },
  { id: "web", name: "Web Tools", icon: "🌐" },
  { id: "crypto", name: "Crypto & Hash", icon: "🛡️" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const tools: Tool[] = [
  // Encoders
  { slug: "base64", name: "Base64 Encoder/Decoder", description: "Encode and decode Base64 strings with Unicode support", category: "encoders", icon: "🔐", tags: ["base64", "encode", "decode"] },
  { slug: "url-encode", name: "URL Encoder/Decoder", description: "Encode and decode URL strings and query parameters", category: "encoders", icon: "🔗", tags: ["url", "encode", "decode", "percent"] },
  { slug: "html-encode", name: "HTML Encoder/Decoder", description: "Encode and decode HTML entities", category: "encoders", icon: "🏷️", tags: ["html", "entities", "encode"], new: true },
  { slug: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JSON Web Tokens", category: "encoders", icon: "🎟️", tags: ["jwt", "token", "json web token"], new: true },

  // Formatters
  { slug: "json-formatter", name: "JSON Formatter", description: "Format, validate, minify, and explore JSON data", category: "formatters", icon: "{ }", tags: ["json", "format", "validate", "minify"] },
  { slug: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries", category: "formatters", icon: "🗃️", tags: ["sql", "format", "beautify", "query"], new: true },
  { slug: "markdown-preview", name: "Markdown Preview", description: "Write and preview Markdown in real-time", category: "formatters", icon: "📄", tags: ["markdown", "preview", "md"] },

  // Generators
  { slug: "qr-code", name: "QR Code Generator", description: "Generate QR codes from text or URLs, download as PNG", category: "generators", icon: "📱", tags: ["qr", "qrcode", "barcode"] },
  { slug: "password-generator", name: "Password Generator", description: "Generate strong random passwords with crypto-grade randomness", category: "generators", icon: "🔑", tags: ["password", "random", "secure"] },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate UUID v1, v4, and other unique identifiers", category: "generators", icon: "🆔", tags: ["uuid", "guid", "unique", "id"], new: true },
  { slug: "lorem-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder text for designs and mockups", category: "generators", icon: "📜", tags: ["lorem", "ipsum", "placeholder", "text"], new: true },
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes", category: "crypto", icon: "🛡️", tags: ["hash", "md5", "sha", "crypto"], new: true },

  // Converters
  { slug: "color-converter", name: "Color Converter", description: "Convert between HEX, RGB, HSL color formats with picker", category: "converters", icon: "🎨", tags: ["color", "hex", "rgb", "hsl"] },
  { slug: "timestamp", name: "Timestamp Converter", description: "Convert Unix timestamps to human-readable dates", category: "converters", icon: "🕐", tags: ["timestamp", "unix", "epoch", "date"] },
  { slug: "number-base", name: "Number Base Converter", description: "Convert between binary, octal, decimal, and hexadecimal", category: "converters", icon: "🔢", tags: ["binary", "hex", "octal", "decimal", "base"], new: true },
  { slug: "css-unit-converter", name: "CSS Unit Converter", description: "Convert between px, em, rem, vw, vh, % units", category: "converters", icon: "📏", tags: ["css", "px", "em", "rem", "unit"], new: true },

  // Text
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, paragraphs, and reading time", category: "text", icon: "📝", tags: ["word", "count", "character", "text"] },
  { slug: "regex-tester", name: "Regex Tester", description: "Test and debug regular expressions with real-time matching", category: "text", icon: "🔍", tags: ["regex", "regexp", "pattern", "match"] },
  { slug: "text-diff", name: "Text Diff Checker", description: "Compare two texts and highlight differences", category: "text", icon: "📊", tags: ["diff", "compare", "text"], new: true },
  { slug: "case-converter", name: "Case Converter", description: "Convert text between camelCase, snake_case, PascalCase, etc.", category: "text", icon: "🔡", tags: ["case", "camel", "snake", "pascal", "kebab"], new: true },

  // Web
  { slug: "user-agent", name: "User Agent Parser", description: "Parse and analyze browser user agent strings", category: "web", icon: "🕵️", tags: ["user agent", "browser", "parser"], new: true },
  { slug: "mime-types", name: "MIME Type Lookup", description: "Look up MIME types by file extension or vice versa", category: "web", icon: "📋", tags: ["mime", "content type", "file type"], new: true },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((t) => t.category === categoryId);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.includes(q))
  );
}

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
