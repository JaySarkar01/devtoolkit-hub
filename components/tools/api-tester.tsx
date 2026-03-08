"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Plus, Trash2, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const addHeader = () => setHeaders([...headers, { key: "", value: "" }]);
  const removeHeader = (i) => setHeaders(headers.filter((_, idx) => idx !== i));
  const updateHeader = (i, field, val) => { const h = [...headers]; h[i][field] = val; setHeaders(h); };

  const sendRequest = async () => {
    if (!url) { toast.error("Enter a URL"); return; }
    setLoading(true);
    const start = Date.now();
    try {
      const hdrs = {};
      headers.forEach((h) => { if (h.key) hdrs[h.key] = h.value; });
      const config: any = { method, url, headers: hdrs, timeout: 30000 };
      if (["POST", "PUT", "PATCH"].includes(method) && body) {
        try { config.data = JSON.parse(body); } catch { config.data = body; }
      }
      const res = await axios(config);
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: typeof res.data === "object" ? JSON.stringify(res.data, null, 2) : String(res.data),
        time: Date.now() - start,
        size: JSON.stringify(res.data).length,
      });
      toast.success(`${res.status} ${res.statusText}`);
    } catch (err) {
      const res = err.response;
      setResponse({
        status: res?.status || 0,
        statusText: res?.statusText || err.message,
        headers: res?.headers || {},
        data: res?.data ? (typeof res.data === "object" ? JSON.stringify(res.data, null, 2) : String(res.data)) : err.message,
        time: Date.now() - start,
        size: 0,
        error: true,
      });
      toast.error(`Request failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const methodColors = { GET: "#00e676", POST: "#00e5ff", PUT: "#ffab00", DELETE: "#ff3b5c", PATCH: "#b24aff" };

  return (
    <div className="space-y-4">
      {/* URL Bar */}
      <div className="tool-panel p-4 flex flex-col sm:flex-row gap-3">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="h-10 px-3 rounded-lg bg-input border border-border text-sm font-bold cursor-pointer" style={{ color: methodColors[method] }}>
          {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (<option key={m} value={m}>{m}</option>))}
        </select>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/users" className="flex-1 font-mono" />
        <Button onClick={sendRequest} disabled={loading} className="gap-1.5 sm:w-auto w-full">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Send
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Request */}
        <div className="tool-panel p-5 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Headers</h3>
              <Button variant="ghost" size="sm" onClick={addHeader}><Plus className="w-3.5 h-3.5 mr-1" /> Add</Button>
            </div>
            <div className="space-y-2">
              {headers.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={h.key} onChange={(e) => updateHeader(i, "key", e.target.value)} placeholder="Key" className="flex-1 text-sm" />
                  <Input value={h.value} onChange={(e) => updateHeader(i, "value", e.target.value)} placeholder="Value" className="flex-1 text-sm" />
                  <Button variant="ghost" size="icon" onClick={() => removeHeader(i)} className="shrink-0 text-muted-foreground"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              ))}
            </div>
          </div>
          {["POST", "PUT", "PATCH"].includes(method) && (
            <div>
              <h3 className="font-semibold text-sm mb-3">Body</h3>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder='{"key": "value"}' className="min-h-[200px] font-mono text-sm" />
            </div>
          )}
        </div>

        {/* Response */}
        <div className="tool-panel p-5 space-y-3">
          <h3 className="font-semibold text-sm">Response</h3>
          {response ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant={response.error ? "destructive" : "success"} className="font-mono">{response.status} {response.statusText}</Badge>
                <Badge variant="glass" className="gap-1"><Clock className="w-3 h-3" /> {response.time}ms</Badge>
                <Badge variant="glass">{(response.size / 1024).toFixed(1)} KB</Badge>
              </div>
              <pre className="p-4 rounded-lg bg-muted/40 overflow-auto text-sm font-mono whitespace-pre-wrap max-h-[400px]">{response.data}</pre>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[300px] text-muted-foreground text-sm">Send a request to see the response</div>
          )}
        </div>
      </div>
    </div>
  );
}
