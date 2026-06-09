import Link from "next/link";

const tools = [
  { href: "/json-formatter", name: "JSON Formatter", desc: "Format, validate, and minify JSON data instantly", icon: "{ }" },
  { href: "/color-converter", name: "Color Converter", desc: "Convert between HEX, RGB, HSL color formats", icon: "🎨" },
  { href: "/word-counter", name: "Word Counter", desc: "Count words, characters, sentences, and paragraphs", icon: "📝" },
  { href: "/base64", name: "Base64 Encoder/Decoder", desc: "Encode and decode Base64 strings online", icon: "🔐" },
  { href: "/qr-code", name: "QR Code Generator", desc: "Generate QR codes from any text or URL", icon: "📱" },
  { href: "/markdown-preview", name: "Markdown Preview", desc: "Preview Markdown content in real-time", icon: "📄" },
  { href: "/timestamp", name: "Timestamp Converter", desc: "Convert Unix timestamps to human-readable dates", icon: "🕐" },
  { href: "/password-generator", name: "Password Generator", desc: "Generate strong, secure random passwords", icon: "🔑" },
  { href: "/url-encode", name: "URL Encoder/Decoder", desc: "Encode and decode URL strings and parameters", icon: "🔗" },
  { href: "/regex-tester", name: "Regex Tester", desc: "Test and debug regular expressions online", icon: "🔍" },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Online Developer Tools</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of free, fast, and privacy-focused online tools for developers and designers. No signup required.
        </p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">{tool.icon}</div>
            <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">{tool.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tool.desc}</p>
          </Link>
        ))}
      </div>
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Why FreeBox?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <h3 className="font-semibold mb-2">100% Free</h3>
            <p className="text-sm text-gray-500">All tools are completely free to use. No hidden fees or premium plans.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Privacy First</h3>
            <p className="text-sm text-gray-500">All processing happens in your browser. Your data never leaves your device.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">No Signup</h3>
            <p className="text-sm text-gray-500">Start using tools immediately. No registration or email required.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
