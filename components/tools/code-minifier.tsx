"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Minimize2 } from "lucide-react";
import { toast } from "sonner";

export default function CodeMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("javascript");

  const minify = () => {
    try {
      let result = input;
      if (lang === "javascript") {
        result = result.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}();,:])\s*/g, "$1").trim();
      } else if (lang === "css") {
        result = result.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").replace(/;}/g, "}").trim();
      } else {
        result = result.replace(/<!--[\s\S]*?-->/g, "").replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
      }
      setOutput(result);
      const savings = input.length > 0 ? ((1 - result.length / input.length) * 100).toFixed(1) : 0;
      toast.success(`Minified! Saved ${savings}%`);
    } catch (e) {
      toast.error("Minification failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {["javascript", "css", "html"].map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>{l.toUpperCase()}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="tool-panel p-5 space-y-3">
          <h3 className="font-semibold text-sm">Input Code</h3>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste code to minify..." className="min-h-[300px] font-mono text-sm" />
          <div className="flex items-center justify-between">
            <Button onClick={minify} className="gap-1.5"><Minimize2 className="w-4 h-4" /> Minify</Button>
            <span className="text-xs text-muted-foreground">{input.length} chars</span>
          </div>
        </div>
        <div className="tool-panel p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Minified Output</h3>
            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>
          </div>
          <pre className="min-h-[300px] p-4 rounded-lg bg-muted/40 overflow-auto text-sm font-mono whitespace-pre-wrap break-all">{output || "Minified code will appear here..."}</pre>
          {output && <span className="text-xs text-muted-foreground">{output.length} chars ({input.length > 0 ? ((1 - output.length / input.length) * 100).toFixed(1) : 0}% reduction)</span>}
        </div>
      </div>
    </div>
  );
}
