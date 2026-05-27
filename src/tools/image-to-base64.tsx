"use client";

import { useState, useRef } from "react";
import { CopyButton } from "@/components/ui";

export default function ImageToBase64Tool() {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [mimeType, setMimeType] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      const b64 = dataUrl.split(",")[1] || "";
      setBase64(b64);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const dataUri = preview;
  const imgTag = preview ? `<img src="${preview}" alt="${fileName}" />` : "";
  const cssBackground = preview ? `background-image: url(${preview});` : "";

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const clear = () => {
    setBase64(""); setPreview(""); setFileName(""); setFileSize(0); setMimeType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
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
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
        {preview ? (
          <div>
            <img src={preview} alt="Preview" className="max-h-40 mx-auto mb-3 rounded" />
            <div className="text-sm text-slate-600 dark:text-slate-400">{fileName} ({formatSize(fileSize)})</div>
            <div className="text-xs text-slate-400 mt-1">Click to change image</div>
          </div>
        ) : (
          <div className="text-slate-500 dark:text-slate-400">
            <svg className="w-10 h-10 mx-auto mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <div className="font-medium">Drop image here or click to upload</div>
            <div className="text-sm mt-1">Supports JPG, PNG, GIF, SVG, WebP</div>
          </div>
        )}
      </div>

      {base64 && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{formatSize(fileSize)}</div>
              <div className="text-xs text-slate-500">Original</div>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{formatSize(base64.length)}</div>
              <div className="text-xs text-slate-500">Base64</div>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="text-lg font-bold text-amber-600 dark:text-amber-400">+{Math.round((base64.length / fileSize - 1) * 100)}%</div>
              <div className="text-xs text-slate-500">Size increase</div>
            </div>
          </div>

          {/* Output tabs */}
          {[
            { label: "Base64 String", value: base64 },
            { label: "Data URI", value: dataUri },
            { label: "HTML <img> Tag", value: imgTag },
            { label: "CSS Background", value: cssBackground },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.label}</h3>
                <CopyButton text={item.value} label="Copy" />
              </div>
              <textarea
                value={item.value}
                readOnly
                rows={2}
                className="w-full p-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 font-mono text-xs resize-y outline-none"
              />
            </div>
          ))}

          <button onClick={clear} className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
