"use client";

import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testString) return { matches: [], error: null };
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [];
      let match;
      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({ value: match[0], index: match.index, groups: match.slice(1) });
          if (!match[0]) break;
        }
      } else {
        match = regex.exec(testString);
        if (match) matches.push({ value: match[0], index: match.index, groups: match.slice(1) });
      }
      return { matches, error: null };
    } catch (e) {
      return { matches: [], error: e.message };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="space-y-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Regular Expression</h3>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-lg font-mono">/</span>
          <Input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="pattern" className="font-mono flex-1" />
          <span className="text-muted-foreground text-lg font-mono">/</span>
          <Input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gi" className="font-mono w-20" />
        </div>
        {result.error && <p className="text-destructive text-sm">{result.error}</p>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="tool-panel p-5 space-y-3">
          <h3 className="font-semibold text-sm">Test String</h3>
          <Textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test against..." className="min-h-[250px] text-sm" />
        </div>
        <div className="tool-panel p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Matches</h3>
            <Badge variant="neon">{result.matches.length} found</Badge>
          </div>
          <div className="space-y-2 min-h-[250px] overflow-auto">
            {result.matches.length > 0 ? result.matches.map((m, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Match {i + 1}</span>
                  <span className="text-xs text-muted-foreground">Index: {m.index}</span>
                </div>
                <code className="text-sm text-neon-cyan font-mono">{m.value}</code>
                {m.groups.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {m.groups.map((g, gi) => (
                      <span key={gi} className="text-xs text-muted-foreground block">Group {gi + 1}: <code className="text-neon-purple">{g}</code></span>
                    ))}
                  </div>
                )}
              </div>
            )) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                {pattern ? "No matches found" : "Enter a pattern and test string"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
