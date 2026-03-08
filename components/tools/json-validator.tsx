"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const validate = () => {
    try {
      JSON.parse(input);
      setResult({ valid: true, message: "✓ Valid JSON" });
      toast.success("JSON is valid");
    } catch (e) {
      setResult({ valid: false, message: e.message });
      toast.error("Invalid JSON");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">JSON Input</h3>
          <Button variant="ghost" size="sm" onClick={() => { setInput(""); setResult(null); }}>
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Clear
          </Button>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here to validate..."
          className="min-h-[350px] font-mono text-sm"
        />
        <Button onClick={validate} className="gap-1.5">
          <CheckCircle className="w-4 h-4" /> Validate
        </Button>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <h3 className="font-semibold text-sm">Validation Result</h3>
        {result ? (
          <div className={`p-6 rounded-lg ${result.valid ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"}`}>
            <div className="flex items-center gap-3 mb-3">
              {result.valid ? (
                <CheckCircle className="w-8 h-8 text-success" />
              ) : (
                <XCircle className="w-8 h-8 text-destructive" />
              )}
              <h4 className={`font-bold text-lg ${result.valid ? "text-success" : "text-destructive"}`}>
                {result.valid ? "Valid JSON" : "Invalid JSON"}
              </h4>
            </div>
            <p className="text-sm font-mono text-muted-foreground">{result.message}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[350px] text-muted-foreground text-sm">
            Paste JSON and click Validate
          </div>
        )}
      </div>
    </div>
  );
}
