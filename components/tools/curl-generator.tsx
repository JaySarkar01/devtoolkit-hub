"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Terminal, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CurlGenerator() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/data");
  const [headers, setHeaders] = useState([{ key: "Content-Type", value: "application/json" }]);
  const [body, setBody] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => {
    let curl = `curl -X ${method}`;
    headers.forEach((h) => { if (h.key) curl += ` \\\n  -H '${h.key}: ${h.value}'`; });
    if (["POST", "PUT", "PATCH"].includes(method) && body) curl += ` \\\n  -d '${body}'`;
    curl += ` \\\n  '${url}'`;
    setOutput(curl);
    toast.success("cURL command generated");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Request Config</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-input border border-border text-sm cursor-pointer">
              {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">URL</label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} className="font-mono text-sm" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-muted-foreground">Headers</label>
            <Button variant="ghost" size="sm" onClick={() => setHeaders([...headers, { key: "", value: "" }])}><Plus className="w-3 h-3 mr-1" /> Add</Button>
          </div>
          {headers.map((h, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input value={h.key} onChange={(e) => { const hs = [...headers]; hs[i].key = e.target.value; setHeaders(hs); }} placeholder="Key" className="flex-1 text-sm" />
              <Input value={h.value} onChange={(e) => { const hs = [...headers]; hs[i].value = e.target.value; setHeaders(hs); }} placeholder="Value" className="flex-1 text-sm" />
              <Button variant="ghost" size="icon" onClick={() => setHeaders(headers.filter((_, idx) => idx !== i))}><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          ))}
        </div>
        {["POST", "PUT", "PATCH"].includes(method) && (
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Body</label>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder='{"key": "value"}' className="min-h-[100px] font-mono text-sm" />
          </div>
        )}
        <Button onClick={generate} className="gap-1.5 w-full"><Terminal className="w-4 h-4" /> Generate cURL</Button>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">cURL Command</h3>
          <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>
        </div>
        <pre className="min-h-[350px] p-4 rounded-lg bg-[#0d1117] border border-border/30 overflow-auto text-sm font-mono text-neon-cyan whitespace-pre-wrap">{output || "cURL command will appear here..."}</pre>
      </div>
    </div>
  );
}
