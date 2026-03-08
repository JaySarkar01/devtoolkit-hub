"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function AiReadmeGenerator() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [features, setFeatures] = useState("");
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!projectName.trim()) { toast.error("Enter a project name"); return; }
    setLoading(true);
    try {
      const res = await axios.post("/api/ai/readme", { projectName, description, techStack, features });
      setReadme(res.data.readme);
      toast.success("README generated!");
    } catch (err) {
      toast.error(err.response?.data?.error || "AI request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Project Details</h3>
        <div className="space-y-3">
          <div><label className="text-xs text-muted-foreground mb-1 block">Project Name *</label><Input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="My Awesome Project" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Description</label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of what your project does..." className="min-h-[80px]" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Tech Stack</label><Input value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="React, Node.js, MongoDB..." /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Key Features</label><Textarea value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="One feature per line..." className="min-h-[80px]" /></div>
        </div>
        <Button onClick={generate} disabled={loading} className="gap-1.5 w-full">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BookOpen className="w-4 h-4" />} Generate README
        </Button>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Generated README</h3>
          {readme && <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(readme); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>}
        </div>
        <pre className="min-h-[400px] p-4 rounded-lg bg-muted/40 overflow-auto text-sm font-mono whitespace-pre-wrap">
          {loading ? "Generating README..." : readme || "Fill in details and click Generate"}
        </pre>
      </div>
    </div>
  );
}
