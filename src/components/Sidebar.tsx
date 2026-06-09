"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, getToolsByCategory } from "@/lib/tools";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto h-full">
      <div className="p-4">
        <Link href="/" onClick={onClose} className="text-xl font-bold text-blue-600 dark:text-blue-400 block mb-6">
          FreeBox
        </Link>
        <nav className="space-y-6">
          {categories.map((cat) => {
            const catTools = getToolsByCategory(cat.id);
            return (
              <div key={cat.id}>
                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>{cat.icon}</span> {cat.name}
                </h3>
                <ul className="space-y-0.5">
                  {catTools.map((tool) => {
                    const active = pathname === `/${tool.slug}`;
                    return (
                      <li key={tool.slug}>
                        <Link
                          href={`/${tool.slug}`}
                          onClick={onClose}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                            active
                              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                          }`}
                        >
                          <span className="text-xs">{tool.icon}</span>
                          <span className="truncate">{tool.name}</span>
                          {tool.new && (
                            <span className="ml-auto text-[10px] bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded-full font-medium">
                              NEW
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
