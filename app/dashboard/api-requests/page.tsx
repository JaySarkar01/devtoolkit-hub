"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ApiRequestsPage() {
  const [requests, setRequests] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { Authorization: `Bearer ${token}` };

  const load = async () => {
    try {
      const res = await axios.get("/api/api-requests", { headers });
      setRequests(res.data.requests || []);
    } catch { }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    try {
      await axios.delete(`/api/api-requests?id=${id}`, { headers });
      toast.success("Deleted");
      load();
    } catch { toast.error("Delete failed"); }
  };

  const methodColors = { GET: "#00e676", POST: "#00e5ff", PUT: "#ffab00", DELETE: "#ff3b5c", PATCH: "#b24aff" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Saved API Requests</h1>
        <p className="text-muted-foreground text-sm mt-1">{requests.length} request(s) saved</p>
      </div>

      <div className="space-y-3">
        {requests.length > 0 ? requests.map((r) => (
          <div key={r._id} className="glass-card p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Badge style={{ background: `${methodColors[r.method]}20`, color: methodColors[r.method], borderColor: `${methodColors[r.method]}40` }} className="font-mono font-bold text-xs">{r.method}</Badge>
                <h3 className="font-semibold text-sm">{r.name}</h3>
              </div>
              <button onClick={() => remove(r._id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <code className="text-sm font-mono text-muted-foreground block truncate">{r.url}</code>
            <p className="text-xs text-muted-foreground mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
          </div>
        )) : (
          <div className="text-center py-16 text-muted-foreground">
            <Send className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No API requests saved yet</p>
            <p className="text-sm mt-1">Use the API Tester tool to save requests</p>
          </div>
        )}
      </div>
    </div>
  );
}
