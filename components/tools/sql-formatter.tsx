"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { format as formatSQL } from "sql-formatter";

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState("sql");

  const format = () => {
    try {
      const result = formatSQL(input, { language: dialect, tabWidth: 2, keywordCase: "upper" });
      setOutput(result);
      toast.success("SQL formatted");
    } catch (e) {
      setOutput(`Error: ${e.message}`);
      toast.error("Formatting failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {["sql", "mysql", "postgresql", "sqlite"].map((d) => (
          <button key={d} onClick={() => setDialect(d)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${dialect === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>{d.toUpperCase()}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="tool-panel p-5 space-y-3">
          <h3 className="font-semibold text-sm">SQL Input</h3>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id = 1 ORDER BY name" className="min-h-[350px] font-mono text-sm" />
          <Button onClick={format} className="gap-1.5"><Wand2 className="w-4 h-4" /> Format</Button>
        </div>
        <div className="tool-panel p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Formatted SQL</h3>
            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>
          </div>
          <pre className="min-h-[350px] p-4 rounded-lg bg-muted/40 overflow-auto text-sm font-mono whitespace-pre-wrap">{output || "Formatted SQL will appear here..."}</pre>
        </div>
      </div>
    </div>
  );
}
