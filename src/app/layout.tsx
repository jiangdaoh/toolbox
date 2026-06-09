import type { Metadata } from "next";
import "./globals.css";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: { default: "FreeBox — Free Online Developer Tools", template: "%s | FreeBox" },
  description: "Free online developer tools that run in your browser. JSON formatter, Base64, QR code generator, regex tester, hash generator, and 20+ more tools. No signup, no data sent to servers.",
  keywords: ["online tools", "developer tools", "json formatter", "base64", "qr code generator", "regex tester", "hash generator", "free tools", "privacy"],
  openGraph: { type: "website", locale: "en_US", siteName: "FreeBox", title: "FreeBox — Free Online Developer Tools" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
