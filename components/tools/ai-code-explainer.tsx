"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function AiCodeExplainer() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const explain = async () => {
    if (!code.trim()) { toast.error("Paste some code first"); return; }
    setLoading(true);
    try {
      const res = await axios.post("/api/ai/explain", { code });
      setExplanation(res.data.explanation);
      toast.success("Code explained!");
    } catch (err) {
      toast.error(err.response?.data?.error || "AI request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-3">
        <h3 className="font-semibold text-sm">Your Code</h3>
        <Textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Paste any code here and AI will explain it..." className="min-h-[350px] font-mono text-sm" />
        <Button onClick={explain} disabled={loading} className="gap-1.5">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Explain Code
        </Button>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">AI Explanation</h3>
          {explanation && <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(explanation); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>}
        </div>
        <div className="min-h-[350px] p-4 rounded-lg bg-muted/40 overflow-auto text-sm leading-relaxed whitespace-pre-wrap">
          {loading ? (
            <div className="flex items-center gap-3 text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin" /> Analyzing code...</div>
          ) : explanation ? (
            explanation
          ) : (
            <span className="text-muted-foreground">Paste code and click Explain to get an AI-powered breakdown</span>
          )}
        </div>
      </div>
    </div>
  );
}
