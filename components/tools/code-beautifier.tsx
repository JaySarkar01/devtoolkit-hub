"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { js_beautify, css_beautify, html_beautify } from "js-beautify";

export default function CodeBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("javascript");

  const beautify = () => {
    try {
      const opts = { indent_size: 2, space_in_empty_paren: true };
      let result;
      if (lang === "javascript") result = js_beautify(input, opts);
      else if (lang === "css") result = css_beautify(input, opts);
      else result = html_beautify(input, opts);
      setOutput(result);
      toast.success("Code beautified");
    } catch (e) {
      setOutput(`Error: ${e.message}`);
      toast.error("Beautification failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {["javascript", "css", "html"].map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="tool-panel p-5 space-y-3">
          <h3 className="font-semibold text-sm">Input Code</h3>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your code here..." className="min-h-[350px] font-mono text-sm" />
          <Button onClick={beautify} className="gap-1.5"><Wand2 className="w-4 h-4" /> Beautify</Button>
        </div>
        <div className="tool-panel p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Beautified Output</h3>
            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>
          </div>
          <pre className="min-h-[350px] p-4 rounded-lg bg-muted/40 overflow-auto text-sm font-mono whitespace-pre-wrap">{output || "Beautified code will appear here..."}</pre>
        </div>
      </div>
    </div>
  );
}
