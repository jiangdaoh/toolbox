"use client";
import { useState, useDeferredValue, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const keywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "GROUP BY", "HAVING", "LIMIT", "OFFSET", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "ON", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "AS", "IN", "NOT IN", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL", "CASE", "WHEN", "THEN", "ELSE", "END", "UNION", "UNION ALL", "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX"];

function formatSql(sql: string, indent: number = 2): string {
  let formatted = sql.replace(/\s+/g, " ").trim();
  const pad = " ".repeat(indent);
  const newLineKeywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "GROUP BY", "HAVING", "LIMIT", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "ON", "UNION", "UNION ALL"];

  // Add newlines before major keywords
  for (const kw of newLineKeywords) {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    formatted = formatted.replace(regex, `\n${kw}`);
  }

  // Indent sub-clauses
  const lines = formatted.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines
    .map((line, i) => {
      const upper = line.toUpperCase();
      if (i === 0 && upper.startsWith("SELECT")) return line;
      if (upper.startsWith("WHERE") || upper.startsWith("FROM") || upper.startsWith("ORDER") || upper.startsWith("GROUP") || upper.startsWith("HAVING") || upper.startsWith("LIMIT")) return line;
      return `${pad}${line}`;
    })
    .join("\n");
}

export default function SqlFormatter() {
  const [input, setInput] = useState("SELECT u.id, u.name, u.email, COUNT(o.id) AS order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = 1 AND o.created_at > '2024-01-01' GROUP BY u.id, u.name, u.email HAVING COUNT(o.id) > 5 ORDER BY order_count DESC LIMIT 100");
  const [indent, setIndent] = useState(2);
  const deferredInput = useDeferredValue(input);

  const output = useCallback(() => {
    if (!deferredInput.trim()) return "";
    return formatSql(deferredInput, indent);
  }, [deferredInput, indent]);

  return (
    <ToolLayout slug="sql-formatter">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Input SQL</label>
            <button onClick={() => setInput("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <textarea
            className="w-full h-72 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm resize-y focus:border-blue-500 outline-none transition-colors"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-500">Formatted</label>
            <div className="flex items-center gap-2">
              <select className="text-xs border border-gray-200 dark:border-gray-700 rounded px-1.5 py-1 bg-white dark:bg-gray-900" value={indent} onChange={(e) => setIndent(Number(e.target.value))}>
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>Tab</option>
              </select>
              <CopyButton text={output()} />
            </div>
          </div>
          <pre className="w-full h-72 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-auto whitespace-pre-wrap">
            {output()}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
