"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setDark(stored ? stored === "dark" : true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
