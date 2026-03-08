"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const now = Math.floor(Date.now() / 1000);

  const tsToDate = () => {
    try {
      const ts = Number(timestamp);
      const ms = ts > 1e12 ? ts : ts * 1000;
      const d = new Date(ms);
      if (isNaN(d.getTime())) throw new Error("Invalid");
      setDateStr(d.toISOString());
      toast.success("Converted!");
    } catch { toast.error("Invalid timestamp"); }
  };

  const dateToTs = () => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) throw new Error("Invalid");
      setTimestamp(String(Math.floor(d.getTime() / 1000)));
      toast.success("Converted!");
    } catch { toast.error("Invalid date"); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Unix Timestamp</h3>
        <Input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder={String(now)} className="font-mono" />
        <Button onClick={tsToDate} className="gap-1.5 w-full"><ArrowRightLeft className="w-4 h-4" /> To Date</Button>
        <Button variant="outline" size="sm" onClick={() => { setTimestamp(String(now)); toast.success("Current timestamp set"); }}>Current Time: {now}</Button>
      </div>
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Date String (ISO 8601)</h3>
        <Input value={dateStr} onChange={(e) => setDateStr(e.target.value)} placeholder={new Date().toISOString()} className="font-mono" />
        <Button onClick={dateToTs} className="gap-1.5 w-full"><ArrowRightLeft className="w-4 h-4" /> To Timestamp</Button>
        {timestamp && dateStr && (
          <div className="p-3 rounded-lg bg-muted/40 text-sm space-y-1">
            <p><span className="text-muted-foreground">Local: </span>{new Date(Number(timestamp) > 1e12 ? Number(timestamp) : Number(timestamp) * 1000).toLocaleString()}</p>
            <p><span className="text-muted-foreground">UTC: </span>{new Date(Number(timestamp) > 1e12 ? Number(timestamp) : Number(timestamp) * 1000).toUTCString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
