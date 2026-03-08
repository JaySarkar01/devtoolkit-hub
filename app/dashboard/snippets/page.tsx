"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Code2, Plus, Trash2, Copy, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { Authorization: `Bearer ${token}` };

  const load = async () => {
    try {
      const res = await axios.get("/api/snippets", { headers });
      setSnippets(res.data.snippets || []);
    } catch { }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!title || !code) { toast.error("Title and code required"); return; }
    try {
      await axios.post("/api/snippets", { title, code, language }, { headers });
      toast.success("Snippet saved!");
      setShowNew(false); setTitle(""); setCode("");
      load();
    } catch (err) { toast.error("Save failed"); }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`/api/snippets?id=${id}`, { headers });
      toast.success("Deleted");
      load();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Saved Snippets</h1>
          <p className="text-muted-foreground text-sm mt-1">{snippets.length} snippet(s) saved</p>
        </div>
        <Button onClick={() => setShowNew(!showNew)} className="gap-1.5">
          {showNew ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showNew ? "Cancel" : "New Snippet"}
        </Button>
      </div>

      {showNew && (
        <div className="glass-card p-5 space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Snippet title" />
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-10 px-3 rounded-lg bg-input border border-border text-sm cursor-pointer">
            {["javascript", "typescript", "python", "html", "css", "sql", "json", "bash", "other"].map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <Textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Paste your code..." className="min-h-[150px] font-mono text-sm" />
          <Button onClick={save} className="gap-1.5"><Code2 className="w-4 h-4" /> Save Snippet</Button>
        </div>
      )}

      <div className="space-y-3">
        {snippets.length > 0 ? snippets.map((s) => (
          <div key={s._id} className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{s.title}</h3>
                <Badge variant="glass" className="text-xs">{s.language}</Badge>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { navigator.clipboard.writeText(s.code); toast.success("Copied!"); }} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"><Copy className="w-3.5 h-3.5" /></button>
                <button onClick={() => remove(s._id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <pre className="p-3 rounded-lg bg-muted/40 text-xs font-mono overflow-auto max-h-[200px] whitespace-pre-wrap">{s.code}</pre>
            <p className="text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</p>
          </div>
        )) : (
          <div className="text-center py-16 text-muted-foreground">
            <Code2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No snippets saved yet</p>
            <p className="text-sm mt-1">Click &ldquo;New Snippet&rdquo; to save your first one</p>
          </div>
        )}
      </div>
    </div>
  );
}
