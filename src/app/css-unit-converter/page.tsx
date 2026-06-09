"use client";
import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function CssUnitConverter() {
  const [value, setValue] = useState("16");
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [viewportWidth, setViewportWidth] = useState(1920);

  const results = useMemo(() => {
    const px = parseFloat(value);
    if (isNaN(px)) return null;
    return {
      px: px.toFixed(2) + "px",
      rem: (px / baseFontSize).toFixed(4) + "rem",
      em: (px / baseFontSize).toFixed(4) + "em",
      vw: ((px / viewportWidth) * 100).toFixed(4) + "vw",
      percent: ((px / baseFontSize) * 100).toFixed(2) + "%",
      pt: (px * 0.75).toFixed(2) + "pt",
    };
  }, [value, baseFontSize, viewportWidth]);

  return (
    <ToolLayout slug="css-unit-converter">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Value (px)</label>
            <input className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm focus:border-blue-500 outline-none" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Base Font Size: {baseFontSize}px</label>
            <input type="range" min={8} max={32} value={baseFontSize} onChange={(e) => setBaseFontSize(Number(e.target.value))} className="w-full accent-blue-600 mt-2" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Viewport: {viewportWidth}px</label>
            <input type="range" min={320} max={3840} step={10} value={viewportWidth} onChange={(e) => setViewportWidth(Number(e.target.value))} className="w-full accent-blue-600 mt-2" />
          </div>
        </div>
        {results && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(results).map(([unit, val]) => (
              <div key={unit} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <div className="text-xs text-gray-400">{unit.toUpperCase()}</div>
                  <code className="font-mono text-sm">{val}</code>
                </div>
                <CopyButton text={val} />
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
