"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState(null);

  const decode = () => {
    try {
      const parts = input.trim().split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT: must have 3 parts");
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      setDecoded({ header, payload, signature: parts[2] });
      toast.success("JWT decoded");
    } catch (e) {
      setDecoded(null);
      toast.error(e.message || "Invalid JWT token");
    }
  };

  const isExpired = decoded?.payload?.exp ? decoded.payload.exp * 1000 < Date.now() : false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-3">
        <h3 className="font-semibold text-sm">JWT Token</h3>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." className="min-h-[200px] font-mono text-sm" />
        <Button onClick={decode} className="gap-1.5"><KeyRound className="w-4 h-4" /> Decode</Button>
      </div>
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Decoded Token</h3>
        {decoded ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neon-cyan uppercase tracking-wider">Header</span>
                <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(JSON.stringify(decoded.header, null, 2)); toast.success("Copied!"); }}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <pre className="p-3 rounded-lg bg-muted/40 text-sm font-mono overflow-auto">{JSON.stringify(decoded.header, null, 2)}</pre>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neon-purple uppercase tracking-wider">Payload</span>
                {decoded.payload.exp && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isExpired ? "bg-destructive/20 text-destructive" : "bg-success/20 text-success"}`}>
                    {isExpired ? "Expired" : "Valid"}
                  </span>
                )}
              </div>
              <pre className="p-3 rounded-lg bg-muted/40 text-sm font-mono overflow-auto">{JSON.stringify(decoded.payload, null, 2)}</pre>
            </div>
            {decoded.payload.exp && (
              <p className="text-xs text-muted-foreground">
                Expires: {new Date(decoded.payload.exp * 1000).toLocaleString()}
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[200px] text-muted-foreground text-sm">Paste a JWT and click Decode</div>
        )}
      </div>
    </div>
  );
}
