"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState([]);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);

  const generate = () => {
    const results = Array.from({ length: count }, () => {
      let uuid = generateUUID();
      if (!hyphens) uuid = uuid.replace(/-/g, "");
      if (uppercase) uuid = uuid.toUpperCase();
      return uuid;
    });
    setUuids(results);
    toast.success(`Generated ${count} UUID(s)`);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    toast.success("All UUIDs copied!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Count</label>
            <Input type="number" value={count} onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))} min={1} max={100} />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="cursor-pointer" /> Uppercase
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="cursor-pointer" /> Include hyphens
          </label>
        </div>
        <Button onClick={generate} className="gap-1.5 w-full"><RefreshCw className="w-4 h-4" /> Generate</Button>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Generated UUIDs</h3>
          {uuids.length > 0 && (
            <Button variant="ghost" size="sm" onClick={copyAll}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy All</Button>
          )}
        </div>
        <div className="space-y-1.5 min-h-[250px] overflow-auto">
          {uuids.length > 0 ? uuids.map((uuid, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 group">
              <span className="text-xs text-muted-foreground w-6">{i + 1}</span>
              <code className="text-sm font-mono flex-1 text-foreground">{uuid}</code>
              <button onClick={() => { navigator.clipboard.writeText(uuid); toast.success("Copied!"); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground cursor-pointer">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          )) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Click Generate to create UUIDs</div>
          )}
        </div>
      </div>
    </div>
  );
}
