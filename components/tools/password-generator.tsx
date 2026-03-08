"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Shield } from "lucide-react";
import { toast } from "sonner";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { toast.error("Select at least one character type"); return; }
    let result = "";
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    for (let i = 0; i < length; i++) result += chars[arr[i] % chars.length];
    setPassword(result);
  }, [length, upper, lower, numbers, symbols]);

  const strength = () => {
    if (length >= 20 && upper && lower && numbers && symbols) return { label: "Very Strong", color: "#00e676", pct: 100 };
    if (length >= 12 && [upper, lower, numbers, symbols].filter(Boolean).length >= 3) return { label: "Strong", color: "#00e5ff", pct: 75 };
    if (length >= 8) return { label: "Medium", color: "#ffab00", pct: 50 };
    return { label: "Weak", color: "#ff3b5c", pct: 25 };
  };

  const s = strength();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Settings</h3>
        <div>
          <label className="text-sm text-muted-foreground mb-1 flex justify-between"><span>Length</span><span className="text-foreground font-mono">{length}</span></label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-[var(--primary)] cursor-pointer" />
        </div>
        {[
          { label: "Uppercase (A-Z)", checked: upper, set: setUpper },
          { label: "Lowercase (a-z)", checked: lower, set: setLower },
          { label: "Numbers (0-9)", checked: numbers, set: setNumbers },
          { label: "Symbols (!@#$)", checked: symbols, set: setSymbols },
        ].map((opt) => (
          <label key={opt.label} className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={opt.checked} onChange={(e) => opt.set(e.target.checked)} className="cursor-pointer" /> {opt.label}
          </label>
        ))}
        <Button onClick={generate} className="gap-1.5 w-full"><RefreshCw className="w-4 h-4" /> Generate Password</Button>
      </div>
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Generated Password</h3>
        {password ? (
          <>
            <div className="relative">
              <pre className="p-4 rounded-lg bg-muted/40 text-lg font-mono break-all pr-12">{password}</pre>
              <button onClick={() => { navigator.clipboard.writeText(password); toast.success("Copied!"); }} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground cursor-pointer"><Copy className="w-5 h-5" /></button>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Strength</span><span style={{ color: s.color }} className="font-medium">{s.label}</span></div>
              <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-muted-foreground text-sm gap-3">
            <Shield className="w-10 h-10 opacity-30" />
            Click Generate to create a secure password
          </div>
        )}
      </div>
    </div>
  );
}
