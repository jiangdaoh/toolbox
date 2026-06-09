"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import SearchPalette from "./SearchPalette";
import ThemeToggle from "./ThemeToggle";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      <div className={`fixed z-50 lg:static lg:z-0 inset-y-0 left-0 transform transition-transform lg:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 shrink-0 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Open menu">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <span className="lg:hidden font-bold text-blue-600 dark:text-blue-400">FreeBox</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))} className="hidden sm:block px-3 py-1.5 text-sm text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" aria-label="Search">
              Search ⌘K
            </button>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <SearchPalette />
    </div>
  );
}
