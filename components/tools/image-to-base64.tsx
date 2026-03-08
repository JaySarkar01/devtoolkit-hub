"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Upload, Image } from "lucide-react";
import { toast } from "sonner";

export default function ImageToBase64() {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBase64(result);
      setPreview(result);
      toast.success("Image converted!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="tool-panel p-5 space-y-4">
        <h3 className="font-semibold text-sm">Upload Image</h3>
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <Image className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">Click or drag to upload an image</p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, SVG, WebP</p>
          {fileName && <p className="text-sm text-primary mt-3">{fileName}</p>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        {preview && (
          <div className="rounded-xl overflow-hidden border border-border">
            <img src={preview} alt="Preview" className="max-h-60 w-full object-contain bg-muted/20" />
          </div>
        )}
      </div>
      <div className="tool-panel p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Base64 Output</h3>
          <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(base64); toast.success("Copied!"); }}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</Button>
        </div>
        <pre className="min-h-[350px] p-4 rounded-lg bg-muted/40 overflow-auto text-xs font-mono whitespace-pre-wrap break-all">{base64 || "Base64 string will appear here..."}</pre>
        {base64 && <span className="text-xs text-muted-foreground">{(base64.length / 1024).toFixed(1)} KB</span>}
      </div>
    </div>
  );
}
