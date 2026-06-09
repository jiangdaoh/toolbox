"use client";
import { useState, useEffect } from "react";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("59, 130, 246");
  const [hsl, setHsl] = useState("217, 91%, 60%");

  useEffect(() => {
    const match = rgb.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);
    if (match) {
      const [r, g, b] = [Number(match[1]), Number(match[2]), Number(match[3])];
      if (r <= 255 && g <= 255 && b <= 255) {
        setHex(rgbToHex(r, g, b));
        const [hh, ss, ll] = rgbToHsl(r, g, b);
        setHsl(`${hh}, ${ss}%, ${ll}%`);
      }
    }
  }, [rgb]);

  const fromHex = (v: string) => {
    setHex(v);
    const c = hexToRgb(v);
    if (c) {
      setRgb(c.join(", "));
      const [h, s, l] = rgbToHsl(...c);
      setHsl(`${h}, ${s}%, ${l}%`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Color Converter</h1>
      <p className="text-gray-500 mb-6">Convert between HEX, RGB, and HSL color formats instantly.</p>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">HEX</label>
            <div className="flex gap-2">
              <input className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-mono bg-gray-50 dark:bg-gray-900" value={hex} onChange={(e) => fromHex(e.target.value)} />
              <input type="color" value={hex} onChange={(e) => fromHex(e.target.value)} className="w-12 h-10 rounded cursor-pointer border-0" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">RGB</label>
            <input className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-mono bg-gray-50 dark:bg-gray-900" value={rgb} onChange={(e) => setRgb(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">HSL</label>
            <input className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-mono bg-gray-50 dark:bg-gray-900" value={hsl} readOnly />
          </div>
        </div>
        <div className="w-full md:w-48 h-48 rounded-xl border border-gray-200 dark:border-gray-800" style={{ backgroundColor: hex }} />
      </div>
    </div>
  );
}
