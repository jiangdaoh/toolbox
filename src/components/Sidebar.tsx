"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, getToolsByCategory } from "@/lib/tools";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto h-full">
      <div className="p-4">
        <Link href="/" onClick={onClose} className="text-xl font-bold text-blue-600 dark:text-blue-400 block mb-6">FreeBox</Link>
        <nav className="space-y-5">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{cat.icon} {cat.name}</h3>
              <ul className="space-y-0.5">
                {getToolsByCategory(cat.id).map((tool) => {
                  const active = pathname === `/${tool.slug}`;
                  return (
                    <li key={tool.slug}>
                      <Link
                        href={`/${tool.slug}`}
                        onClick={onClose}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                          active ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span className="text-xs">{tool.icon}</span>
                        <span className="truncate">{tool.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
