"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Trash2, Wand2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      toast.success("JSON formatted successfully");
    } catch (e) {
      setOutput(`Error: ${e.message}`);
      toast.error("Invalid JSON");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      toast.success("JSON minified");
    } catch (e) {
      setOutput(`Error: ${e.message}`);
      toast.error("Invalid JSON");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Input JSON</h3>
          <Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); }}>
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Clear
          </Button>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value", "array": [1, 2, 3]}'
          className="min-h-[350px] font-mono text-sm"
        />
        <div className="flex items-center gap-2">
          <Button onClick={format} className="gap-1.5">
            <Wand2 className="w-4 h-4" /> Format
          </Button>
          <Button onClick={minify} variant="outline">
            Minify
          </Button>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="h-9 px-3 rounded-lg bg-input border border-border text-sm cursor-pointer"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        </div>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Formatted Output</h3>
          <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}>
            <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy
          </Button>
        </div>
        <pre className="min-h-[350px] p-4 rounded-lg bg-muted/40 overflow-auto text-sm font-mono whitespace-pre-wrap break-words">
          {output || "Formatted JSON will appear here..."}
        </pre>
      </div>
    </div>
  );
}
