"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Type } from "lucide-react";
import { toast } from "sonner";

const WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum"];

function generateLorem(paragraphs, wordsPerParagraph) {
  const result = [];
  for (let p = 0; p < paragraphs; p++) {
    const words = [];
    for (let w = 0; w < wordsPerParagraph; w++) {
      words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    result.push(words.join(" ") + ".");
  }
  return result.join("\n\n");
}

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerPara, setWordsPerPara] = useState(50);
  const [output, setOutput] = useState("");

  const generate = () => {
    setOutput(generateLorem(paragraphs, wordsPerPara));
    toast.success("Lorem Ipsum generated");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Settings</h3>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Paragraphs</label>
          <Input type="number" value={paragraphs} onChange={(e) => setParagraphs(Math.min(20, Math.max(1, Number(e.target.value))))} min={1} max={20} />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Words per Paragraph</label>
          <Input type="number" value={wordsPerPara} onChange={(e) => setWordsPerPara(Math.min(200, Math.max(10, Number(e.target.value))))} min={10} max={200} />
        </div>
        <Button onClick={generate} className="gap-1.5 w-full"><RefreshCw className="w-4 h-4" /> Generate</Button>
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Generated Text</h3>
          <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>
        </div>
        <div className="min-h-[300px] p-4 rounded-lg bg-muted/40 overflow-auto text-sm leading-relaxed whitespace-pre-wrap">{output || "Click Generate to create lorem ipsum text"}</div>
      </div>
    </div>
  );
}
