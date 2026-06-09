"use client";
import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import ToolLayout from "@/components/ToolLayout";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://github.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      margin: 2,
      color: { dark: fgColor, light: bgColor },
    }).catch(() => {});
  }, [text, size, fgColor, bgColor]);

  const download = (format: "png" | "svg") => {
    if (format === "svg") {
      QRCode.toString(text, { type: "svg", color: { dark: fgColor, light: bgColor } }, (err, str) => {
        if (!err) {
          const blob = new Blob([str], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "qrcode.svg"; a.click();
          URL.revokeObjectURL(url);
        }
      });
    } else if (canvasRef.current) {
      const a = document.createElement("a");
      a.href = canvasRef.current.toDataURL("image/png");
      a.download = "qrcode.png"; a.click();
    }
  };

  return (
    <ToolLayout slug="qr-code">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Text or URL</label>
            <textarea
              className="w-full h-20 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm resize-y focus:border-blue-500 outline-none transition-colors"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL..."
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Size: {size}px</label>
            <input type="range" min={128} max={512} step={32} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div className="flex gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Foreground</label>
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Background</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => download("png")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">Download PNG</button>
            <button onClick={() => download("svg")} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm transition-colors">Download SVG</button>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-white rounded-xl border border-gray-200 dark:border-gray-700">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </ToolLayout>
  );
}
