import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "FreeBox — Free Online Developer Tools", template: "%s | FreeBox" },
  description: "Free online developer tools that run in your browser. JSON formatter, Base64, QR code generator, regex tester, hash generator, and 20+ more tools. No signup, no data sent to servers.",
  keywords: ["online tools", "developer tools", "json formatter", "base64", "qr code generator", "regex tester", "hash generator", "free tools", "privacy"],
  openGraph: { type: "website", locale: "en_US", siteName: "FreeBox", title: "FreeBox — Free Online Developer Tools" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!localStorage.getItem("theme")||localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark");`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
