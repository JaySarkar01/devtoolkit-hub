"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Hash } from "lucide-react";
import { toast } from "sonner";

async function hashText(text, algo) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const ALGORITHMS = [
  { label: "SHA-1", value: "SHA-1" },
  { label: "SHA-256", value: "SHA-256" },
  { label: "SHA-384", value: "SHA-384" },
  { label: "SHA-512", value: "SHA-512" },
];

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({});

  const generate = async () => {
    if (!input) { toast.error("Enter text to hash"); return; }
    const results = {};
    for (const algo of ALGORITHMS) {
      results[algo.value] = await hashText(input, algo.value);
    }
    setHashes(results);
    toast.success("Hashes generated");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-3">
        <h3 className="font-semibold text-sm">Input Text</h3>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to hash..." className="min-h-[250px] text-sm" />
        <Button onClick={generate} className="gap-1.5"><Hash className="w-4 h-4" /> Generate Hashes</Button>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <h3 className="font-semibold text-sm">Hash Results</h3>
        <div className="space-y-3 min-h-[250px]">
          {Object.keys(hashes).length > 0 ? ALGORITHMS.map((algo) => (
            <div key={algo.value} className="p-3 rounded-lg bg-muted/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase">{algo.label}</span>
                <button onClick={() => { navigator.clipboard.writeText(hashes[algo.value]); toast.success("Copied!"); }} className="text-muted-foreground hover:text-foreground cursor-pointer"><Copy className="w-3.5 h-3.5" /></button>
              </div>
              <code className="text-xs font-mono text-muted-foreground break-all block">{hashes[algo.value]}</code>
            </div>
          )) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Enter text and click Generate</div>
          )}
        </div>
      </div>
    </div>
  );
}
