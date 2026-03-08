"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Download, Copy } from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";

const THEMES = [
  { name: "Midnight", bg: "linear-gradient(135deg, #0c1021, #1a1a3e)", text: "#e8ecf4", accent: "#00e5ff" },
  { name: "Sunset", bg: "linear-gradient(135deg, #2d1b69, #6b2fa0, #ff6b6b)", text: "#fff", accent: "#ff6b6b" },
  { name: "Ocean", bg: "linear-gradient(135deg, #0a2463, #1e6091, #00e5ff)", text: "#fff", accent: "#00e5ff" },
  { name: "Forest", bg: "linear-gradient(135deg, #0b3d2e, #1a6b4a)", text: "#e8ecf4", accent: "#39ff14" },
  { name: "Mono", bg: "#1a1a1a", text: "#e0e0e0", accent: "#888" },
];

export default function CodeScreenshot() {
  const [code, setCode] = useState(`function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));`);
  const [theme, setTheme] = useState(0);
  const [padding, setPadding] = useState(40);
  const [fontSize, setFontSize] = useState(14);
  const ref = useRef(null);

  const download = async () => {
    if (!ref.current) return;
    try {
      const dataUrl = await toPng(ref.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = "code-screenshot.png";
      link.href = dataUrl;
      link.click();
      toast.success("Screenshot downloaded!");
    } catch (e) {
      toast.error("Screenshot failed");
    }
  };

  const t = THEMES[theme];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Code</h3>
        <Textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Paste your code here..." className="min-h-[250px] font-mono text-sm" />
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Theme</label>
          <div className="flex gap-2">
            {THEMES.map((th, i) => (
              <button
                key={th.name}
                onClick={() => setTheme(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${theme === i ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"}`}
                style={{ background: typeof th.bg === "string" && !th.bg.includes("gradient") ? th.bg : undefined, backgroundImage: th.bg.includes("gradient") ? th.bg : undefined, color: th.text }}
              >
                {th.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 flex justify-between"><span>Padding</span><span>{padding}px</span></label>
            <input type="range" min={16} max={80} value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full accent-[var(--primary)] cursor-pointer" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 flex justify-between"><span>Font Size</span><span>{fontSize}px</span></label>
            <input type="range" min={10} max={24} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-[var(--primary)] cursor-pointer" />
          </div>
        </div>
        <Button onClick={download} className="gap-1.5 w-full"><Download className="w-4 h-4" /> Download PNG</Button>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <h3 className="font-semibold text-sm">Preview</h3>
        <div className="flex items-center justify-center min-h-[350px] rounded-lg bg-muted/20 p-4 overflow-auto">
          <div ref={ref} style={{ background: t.bg, padding: `${padding}px`, borderRadius: "16px", minWidth: "300px", maxWidth: "100%" }}>
            {/* Window dots */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span style={{ color: `${t.text}60`, fontSize: "11px", marginLeft: "8px" }}>code.js</span>
            </div>
            <pre style={{ color: t.text, fontSize: `${fontSize}px`, fontFamily: "var(--font-mono), 'JetBrains Mono', monospace", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {code || "// Your code here"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
