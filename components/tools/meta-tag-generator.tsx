"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Globe } from "lucide-react";
import { toast } from "sonner";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const generated = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${image}" />`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Page Information</h3>
        <div className="space-y-3">
          <div><label className="text-xs text-muted-foreground mb-1 block">Page Title</label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome Website" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Description</label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description..." className="min-h-[80px]" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Keywords (comma separated)</label><Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="web, development, tools" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Author</label><Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your Name" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">URL</label><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">OG Image URL</label><Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/og.png" /></div>
        </div>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Generated Meta Tags</h3>
          <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(generated); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>
        </div>
        <pre className="min-h-[400px] p-4 rounded-lg bg-[#0d1117] border border-border/30 overflow-auto text-xs font-mono text-neon-cyan whitespace-pre-wrap">{generated}</pre>
      </div>
    </div>
  );
}
