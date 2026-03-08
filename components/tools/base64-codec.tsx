"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

export default function Base64Codec() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
        toast.success("Encoded to Base64");
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
        toast.success("Decoded from Base64");
      }
    } catch (e) {
      setOutput(`Error: ${e.message}`);
      toast.error("Processing failed");
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={setMode}>
        <TabsList>
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="tool-panel p-5 space-y-3">
          <h3 className="font-semibold text-sm">{mode === "encode" ? "Plain Text" : "Base64 String"}</h3>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."} className="min-h-[250px] font-mono text-sm" />
          <Button onClick={process} className="gap-1.5">
            <ArrowRightLeft className="w-4 h-4" /> {mode === "encode" ? "Encode" : "Decode"}
          </Button>
        </div>
        <div className="tool-panel p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Result</h3>
            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}>
              <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy
            </Button>
          </div>
          <pre className="min-h-[250px] p-4 rounded-lg bg-muted/40 overflow-auto text-sm font-mono whitespace-pre-wrap break-all">{output || "Result will appear here..."}</pre>
        </div>
      </div>
    </div>
  );
}
