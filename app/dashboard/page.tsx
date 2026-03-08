"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Send, Star, Clock, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { TOOLS, getToolBySlug } from "@/lib/tools-registry";
import axios from "axios";

export default function DashboardPage() {
  const { user } = useAuth();
  const [snippetCount, setSnippetCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    axios.get("/api/snippets", { headers }).then((r) => setSnippetCount(r.data.snippets?.length || 0)).catch(() => {});
    axios.get("/api/api-requests", { headers }).then((r) => setRequestCount(r.data.requests?.length || 0)).catch(() => {});
    axios.get("/api/favorites", { headers }).then((r) => setFavorites(r.data.favorites || [])).catch(() => {});
  }, []);

  const stats = [
    { icon: Code2, label: "Saved Snippets", value: snippetCount, href: "/dashboard/snippets", color: "#00e5ff" },
    { icon: Send, label: "API Requests", value: requestCount, href: "/dashboard/api-requests", color: "#b24aff" },
    { icon: Star, label: "Favorite Tools", value: favorites.length, href: "/dashboard/favorites", color: "#ffab00" },
    { icon: Wrench, label: "Total Tools", value: TOOLS.length, href: "/tools", color: "#39ff14" },
  ];

  const favTools = favorites.slice(0, 6).map(getToolBySlug).filter(Boolean);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          Welcome back, <span className="gradient-text">{user?.name}</span>
        </h1>
        <p className="text-muted-foreground mt-1">Here&apos;s your developer toolkit overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={s.href} className="block">
              <div className="glass-card p-5 group">
                <s.icon className="w-6 h-6 mb-3" style={{ color: s.color }} />
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Favorite Tools */}
      {favTools.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Favorite Tools</h2>
            <Link href="/dashboard/favorites" className="text-sm text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="glass-card p-4 flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/tools"><Button variant="outline" className="gap-2"><Wrench className="w-4 h-4" /> Browse Tools</Button></Link>
          <Link href="/tools/api-tester"><Button variant="outline" className="gap-2"><Send className="w-4 h-4" /> API Tester</Button></Link>
          <Link href="/tools/ai-code-explainer"><Button variant="outline" className="gap-2"><Code2 className="w-4 h-4" /> AI Explainer</Button></Link>
        </div>
      </div>
    </div>
  );
}
