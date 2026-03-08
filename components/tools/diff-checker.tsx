"use client";

import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { diffLines } from "diff";

export default function DiffChecker() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const diffs = useMemo(() => {
    if (!left && !right) return [];
    return diffLines(left, right);
  }, [left, right]);

  const stats = useMemo(() => {
    let added = 0, removed = 0;
    diffs.forEach((d) => {
      if (d.added) added += d.count || 0;
      if (d.removed) removed += d.count || 0;
    });
    return { added, removed };
  }, [diffs]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="tool-panel p-5 space-y-3">
          <h3 className="font-semibold text-sm">Original Text</h3>
          <Textarea value={left} onChange={(e) => setLeft(e.target.value)} placeholder="Paste original text here..." className="min-h-[250px] text-sm" />
        </div>
        <div className="tool-panel p-5 space-y-3">
          <h3 className="font-semibold text-sm">Modified Text</h3>
          <Textarea value={right} onChange={(e) => setRight(e.target.value)} placeholder="Paste modified text here..." className="min-h-[250px] text-sm" />
        </div>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-sm">Diff Result</h3>
          {(left || right) && (
            <div className="flex gap-2">
              <Badge variant="success" className="font-mono">+{stats.added} added</Badge>
              <Badge variant="destructive" className="font-mono bg-destructive/20">-{stats.removed} removed</Badge>
            </div>
          )}
        </div>
        <pre className="min-h-[200px] p-4 rounded-lg bg-muted/40 overflow-auto text-sm font-mono">
          {diffs.length > 0 ? diffs.map((part, i) => (
            <span
              key={i}
              className={part.added ? "bg-success/20 text-success" : part.removed ? "bg-destructive/20 text-destructive line-through" : "text-muted-foreground"}
            >
              {part.value}
            </span>
          )) : <span className="text-muted-foreground">Paste text in both fields to see differences</span>}
        </pre>
      </div>
    </div>
  );
}
