"use client";

import { useState } from "react";
import { CopyButton } from "@/components/ui";

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
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

export default function ColorPickerTool() {
  const [hex, setHex] = useState("#3b82f6");
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(...rgb);
  const rgbStr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  const hslStr = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-32 h-32 cursor-pointer rounded-lg border-2 border-gray-200" />
        <div className="w-full sm:w-48 h-32 rounded-lg border border-gray-200" style={{ backgroundColor: hex }} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[{ label: "HEX", value: hex, editable: true }, { label: "RGB", value: rgbStr }, { label: "HSL", value: hslStr }].map((item) => (
          <div key={item.label} className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{item.label}</label>
            <div className="flex gap-2">
              <input
                value={item.value}
                readOnly={!item.editable}
                onChange={item.editable ? (e) => { if (/^#[0-9a-f]{0,6}$/i.test(e.target.value)) setHex(e.target.value); } : undefined}
                className={`flex-1 px-3 py-2 border rounded-lg font-mono text-sm outline-none ${item.editable ? "border-gray-300 focus:ring-2 focus:ring-blue-500" : "border-gray-200 bg-gray-50"}`}
              />
              <CopyButton text={item.value} label="Copy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
