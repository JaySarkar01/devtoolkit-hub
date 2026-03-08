"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { marked } from "marked";

export default function MarkdownPreview() {
  const [input, setInput] = useState(`# Hello World\n\nThis is a **markdown** preview tool.\n\n## Features\n- Live preview\n- Full markdown support\n- Code blocks\n\n\`\`\`javascript\nconst greeting = "Hello!";\nconsole.log(greeting);\n\`\`\`\n\n> This is a blockquote\n\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n`);

  const html = (() => {
    try {
      return marked(input, { breaks: true, gfm: true });
    } catch {
      return "<p>Error rendering markdown</p>";
    }
  })();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-3">
        <h3 className="font-semibold text-sm">Markdown Input</h3>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[450px] text-sm" placeholder="Write markdown here..." />
      </div>
      <div className="tool-panel p-5 space-y-3">
        <h3 className="font-semibold text-sm">Preview</h3>
        <div
          className="prose prose-invert max-w-none min-h-[450px] p-4 rounded-lg bg-muted/40 overflow-auto prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-neon-cyan prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#0d1117] prose-blockquote:border-primary/50 prose-th:text-foreground prose-td:text-muted-foreground text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
