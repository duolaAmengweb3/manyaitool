"use client";

import { useState, useRef } from "react";
import { ErrorAlert } from "@/components/ui";

export default function SvgToPngTool() {
  const [svgContent, setSvgContent] = useState("");
  const [scale, setScale] = useState(2);
  const [bgColor, setBgColor] = useState("transparent");
  const [pngUrl, setPngUrl] = useState("");
  const [error, setError] = useState("");
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convert = (svg: string) => {
    if (!svg.trim()) { setPngUrl(""); setError(""); return; }
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, "image/svg+xml");
      const svgEl = doc.querySelector("svg");
      if (!svgEl) throw new Error("No SVG element found");

      const w = parseFloat(svgEl.getAttribute("width") || "300");
      const h = parseFloat(svgEl.getAttribute("height") || "150");
      setDimensions({ w, h });

      const canvas = document.createElement("canvas");
      canvas.width = w * scale;
      canvas.height = h * scale;
      const ctx = canvas.getContext("2d")!;

      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        setPngUrl(canvas.toDataURL("image/png"));
        setError("");
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        setError("Failed to render SVG. Make sure it's valid SVG code.");
      };
      img.src = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid SVG");
      setPngUrl("");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setSvgContent(text);
      convert(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.name.endsWith(".svg")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setSvgContent(text);
      convert(text);
    };
    reader.readAsText(file);
  };

  const download = () => {
    if (!pngUrl) return;
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = `converted-${scale}x.png`;
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
      >
        <input ref={fileInputRef} type="file" accept=".svg" onChange={handleFile} className="hidden" />
        <div className="text-slate-500 dark:text-slate-400">
          <svg className="w-10 h-10 mx-auto mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          <div className="font-medium">Drop SVG file here or click to upload</div>
          <div className="text-sm mt-1">Or paste SVG code below</div>
        </div>
      </div>

      {/* SVG code input */}
      <textarea
        value={svgContent}
        onChange={(e) => { setSvgContent(e.target.value); convert(e.target.value); }}
        placeholder='<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">...</svg>'
        rows={6}
        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 resize-y outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
      />

      {/* Options */}
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          Scale:
          <select value={scale} onChange={(e) => { setScale(Number(e.target.value)); convert(svgContent); }} className="px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
            <option value={4}>4x</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          Background:
          <select value={bgColor} onChange={(e) => { setBgColor(e.target.value); convert(svgContent); }} className="px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            <option value="transparent">Transparent</option>
            <option value="#ffffff">White</option>
            <option value="#000000">Black</option>
          </select>
        </label>
        {dimensions.w > 0 && (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Output: {dimensions.w * scale} × {dimensions.h * scale}px
          </span>
        )}
      </div>

      <ErrorAlert message={error} />

      {/* Preview + Download */}
      {pngUrl && (
        <div className="space-y-3">
          <div className="p-4 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAYdEVYdFRpdGxlAENoZWNrZXJib2FyZCBCRwpgq8AAAAAjSURBVDjLY2CgMmBEFmdB4jMQUsDAwMDAQG0XMFHCIF4AAHyHAgWLxynnAAAAAElFTkSuQmCC')] rounded-lg border border-slate-200 dark:border-slate-700 flex justify-center">
            <img src={pngUrl} alt="Converted PNG" className="max-w-full max-h-64" />
          </div>
          <button
            onClick={download}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Download PNG ({scale}x)
          </button>
        </div>
      )}
    </div>
  );
}
