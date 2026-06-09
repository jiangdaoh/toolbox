"use client";
import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => Math.max(0, Math.min(255, x)).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - b;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgbInput, setRgbInput] = useState("59, 130, 246");
  const [hsl, setHsl] = useState("217, 91%, 60%");
  const [colorPicker, setColorPicker] = useState("#3b82f6");

  useEffect(() => {
    const match = rgbInput.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);
    if (match) {
      const [r, g, b] = [Number(match[1]), Number(match[2]), Number(match[3])];
      if (r <= 255 && g <= 255 && b <= 255) {
        const newHex = rgbToHex(r, g, b);
        setHex(newHex);
        setColorPicker(newHex);
        const [hh, ss, ll] = rgbToHsl(r, g, b);
        setHsl(`${hh}, ${ss}%, ${ll}%`);
      }
    }
  }, [rgbInput]);

  const fromHex = (v: string) => {
    setHex(v);
    setColorPicker(v);
    const c = hexToRgb(v);
    if (c) {
      setRgbInput(c.join(", "));
      const [h, s, l] = rgbToHsl(...c);
      setHsl(`${h}, ${s}%, ${l}%`);
    }
  };

  return (
    <ToolLayout slug="color-converter">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-gray-500">HEX</label>
              <CopyButton text={hex} />
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm focus:border-blue-500 outline-none transition-colors"
                value={hex}
                onChange={(e) => fromHex(e.target.value)}
              />
              <input type="color" value={colorPicker} onChange={(e) => fromHex(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-gray-500">RGB</label>
              <CopyButton text={`rgb(${rgbInput})`} />
            </div>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm focus:border-blue-500 outline-none transition-colors"
              value={rgbInput}
              onChange={(e) => setRgbInput(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-gray-500">HSL</label>
              <CopyButton text={`hsl(${hsl})`} />
            </div>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm"
              value={hsl}
              readOnly
            />
          </div>
        </div>
        <div className="w-full md:w-48 flex flex-col items-center gap-3">
          <div className="w-full h-32 rounded-xl border border-gray-200 dark:border-gray-800 shadow-inner" style={{ backgroundColor: hex }} />
          <div className="text-center">
            <div className="text-xs text-gray-400">Preview</div>
            <div className="font-mono text-sm">{hex}</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
