import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "FreeBox - Free Online Developer Tools", template: "%s | FreeBox" },
  description: "Free online developer tools: JSON formatter, color converter, Base64, QR code generator, regex tester, and more. No signup required.",
  keywords: ["online tools", "json formatter", "base64", "qr code generator", "color converter", "developer tools", "free tools"],
  openGraph: { type: "website", locale: "en_US", siteName: "FreeBox" },
  robots: { index: true, follow: true },
};

const tools = [
  { href: "/json-formatter", name: "JSON Formatter", desc: "Format, validate, and minify JSON" },
  { href: "/color-converter", name: "Color Converter", desc: "Convert HEX, RGB, HSL colors" },
  { href: "/word-counter", name: "Word Counter", desc: "Count words, characters, sentences" },
  { href: "/base64", name: "Base64 Encoder", desc: "Encode and decode Base64 strings" },
  { href: "/qr-code", name: "QR Code Generator", desc: "Generate QR codes from text or URLs" },
  { href: "/markdown-preview", name: "Markdown Preview", desc: "Preview Markdown in real-time" },
  { href: "/timestamp", name: "Timestamp Converter", desc: "Convert Unix timestamps to dates" },
  { href: "/password-generator", name: "Password Generator", desc: "Generate secure random passwords" },
  { href: "/url-encode", name: "URL Encoder", desc: "Encode and decode URL strings" },
  { href: "/regex-tester", name: "Regex Tester", desc: "Test regular expressions online" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">FreeBox</Link>
            <div className="hidden md:flex gap-6 text-sm">
              {tools.slice(0, 5).map((t) => (
                <Link key={t.href} href={t.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.name}</Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-3">Tools</h3>
                {tools.slice(0, 5).map((t) => (
                  <Link key={t.href} href={t.href} className="block py-1 text-gray-500 hover:text-blue-600">{t.name}</Link>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-3">More Tools</h3>
                {tools.slice(5).map((t) => (
                  <Link key={t.href} href={t.href} className="block py-1 text-gray-500 hover:text-blue-600">{t.name}</Link>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-3">About</h3>
                <p className="text-gray-500">Free online developer tools. No signup, no ads, just tools.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <Link href="/privacy" className="block py-1 text-gray-500 hover:text-blue-600">Privacy Policy</Link>
              </div>
            </div>
            <p className="text-center text-gray-400 text-xs mt-8">&copy; {new Date().getFullYear()} FreeBox. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
