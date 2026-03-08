"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, Eye, Users, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#00e5ff", "#b24aff", "#ff2d7b", "#39ff14", "#ffab00", "#ff6b35", "#0077cc", "#8b5cf6"];

export default function GithubAnalyzer() {
  const [repoUrl, setRepoUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    let cleanUrl = repoUrl.trim().replace(/\/+$/, "").replace(/\.git$/, "");
    const match = cleanUrl.match(/github\.com\/([^/\s]+)\/([^/\s#?]+)/);
    if (!match) { toast.error("Enter a valid GitHub URL (e.g., https://github.com/owner/repo)"); return; }
    const owner = match[1];
    const repo = match[2];
    setLoading(true);
    try {
      const res = await axios.post("/api/github/analyze", { owner, repo });
      setData(res.data);
      toast.success("Repository analyzed!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const langData: any[] = data?.languages ? Object.entries(data.languages).map(([name, bytes]) => ({ name, value: Number(bytes) })) : [];
  const totalBytes = langData.reduce((a: number, l: any) => a + (l.value as number), 0);

  return (
    <div className="space-y-6">
      <div className="tool-panel p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/owner/repo" className="flex-1 font-mono" />
          <Button onClick={analyze} disabled={loading} className="gap-1.5">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />} Analyze
          </Button>
        </div>
      </div>

      {data && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Star, label: "Stars", value: data.repo.stargazers_count, color: "#ffab00" },
              { icon: GitFork, label: "Forks", value: data.repo.forks_count, color: "#00e5ff" },
              { icon: Eye, label: "Watchers", value: data.repo.watchers_count, color: "#b24aff" },
              { icon: AlertCircle, label: "Issues", value: data.repo.open_issues_count, color: "#ff2d7b" },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <s.icon className="w-6 h-6 mx-auto mb-2" style={{ color: s.color }} />
                <p className="text-2xl font-bold">{s.value?.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Languages */}
            <div className="tool-panel p-5 space-y-4">
              <h3 className="font-semibold text-sm">Languages</h3>
              {langData.length > 0 && (
                <>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={langData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                        {langData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#0c1021", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e8ecf4" }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-1.5">
                    {langData.map((l, i) => (
                      <div key={l.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="flex-1">{l.name}</span>
                        <span className="text-muted-foreground">{((Number(l.value) / totalBytes) * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Contributors */}
            <div className="tool-panel p-5 space-y-4">
              <h3 className="font-semibold text-sm">Top Contributors</h3>
              <div className="space-y-2">
                {data.contributors?.slice(0, 8).map((c) => (
                  <div key={c.login} className="flex items-center gap-3 p-2 rounded-lg bg-muted/40">
                    <img src={c.avatar_url} alt={c.login} className="w-8 h-8 rounded-full" />
                    <span className="flex-1 text-sm font-medium">{c.login}</span>
                    <Badge variant="glass" className="font-mono text-xs">{c.contributions}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="tool-panel p-5">
            <h3 className="font-semibold text-sm mb-3">Repository Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p><span className="text-muted-foreground">Name: </span>{data.repo.full_name}</p>
              <p><span className="text-muted-foreground">Created: </span>{new Date(data.repo.created_at).toLocaleDateString()}</p>
              <p><span className="text-muted-foreground">License: </span>{data.repo.license?.spdx_id || "None"}</p>
              <p><span className="text-muted-foreground">Default Branch: </span>{data.repo.default_branch}</p>
              {data.repo.description && <p className="sm:col-span-2"><span className="text-muted-foreground">Description: </span>{data.repo.description}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
