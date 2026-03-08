"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; }
  } else { s = 0; }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#00e5ff");

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const formats = [
    { label: "HEX", value: hex },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "RGBA", value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-5">
        <h3 className="font-semibold text-sm">Pick a Color</h3>
        <div className="flex items-center gap-4">
          <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-20 h-20 rounded-xl cursor-pointer border-2 border-border" />
          <div className="flex-1">
            <label className="text-xs text-muted-foreground block mb-1">HEX Value</label>
            <Input value={hex} onChange={(e) => setHex(e.target.value)} className="font-mono text-lg" />
          </div>
        </div>
        <div className="w-full h-32 rounded-xl border border-border" style={{ background: hex }} />
      </div>
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Color Formats</h3>
        <div className="space-y-3">
          {formats.map((f) => (
            <div key={f.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
              <span className="text-xs font-bold text-muted-foreground w-12 uppercase">{f.label}</span>
              <code className="flex-1 text-sm font-mono">{f.value}</code>
              <button onClick={() => { navigator.clipboard.writeText(f.value); toast.success(`${f.label} copied!`); }} className="text-muted-foreground hover:text-foreground cursor-pointer"><Copy className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {["#ff3b5c", "#ffab00", "#00e676", "#00e5ff", "#b24aff", "#ff2d7b", "#ff6b35", "#39ff14", "#0077cc", "#8b5cf6"].map((c) => (
            <button key={c} onClick={() => setHex(c)} className="h-10 rounded-lg border border-border cursor-pointer hover:scale-110 transition-transform" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
