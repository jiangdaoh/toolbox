"use client";
import { useState, useRef } from "react";
import QRCode from "qrcode";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = async () => {
    if (!canvasRef.current || !text) return;
    await QRCode.toCanvas(canvasRef.current, text, { width: size, margin: 2 });
  };

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
      <p className="text-gray-500 mb-6">Generate QR codes from any text or URL. Download as PNG.</p>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Text or URL</label>
            <textarea className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Size: {size}px</label>
            <input type="range" min={128} max={512} step={32} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
          </div>
          <div className="flex gap-3">
            <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Generate</button>
            <button onClick={download} className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Download PNG</button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <canvas ref={canvasRef} className="border border-gray-200 dark:border-gray-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
