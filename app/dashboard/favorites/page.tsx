"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { TOOLS, getToolBySlug, TOOL_CATEGORIES } from "@/lib/tools-registry";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { Authorization: `Bearer ${token}` };

  const load = async () => {
    try {
      const res = await axios.get("/api/favorites", { headers });
      setFavorites(res.data.favorites || []);
    } catch { }
  };

  useEffect(() => { load(); }, []);

  const toggleFav = async (slug) => {
    try {
      const res = await axios.post("/api/favorites", { slug }, { headers });
      setFavorites(res.data.favorites || []);
      toast.success("Favorites updated");
    } catch { toast.error("Failed"); }
  };

  const favTools = favorites.map(getToolBySlug).filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Favorite Tools</h1>
        <p className="text-muted-foreground text-sm mt-1">{favorites.length} tool(s) favorited</p>
      </div>

      <div className="space-y-3">
        {favTools.length > 0 ? favTools.map((tool) => {
          const Icon = tool.icon;
          const cat = TOOL_CATEGORIES[tool.category];
          return (
            <div key={tool.slug} className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cat.color}15`, color: cat.color }}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/tools/${tool.slug}`} className="font-semibold text-sm hover:text-primary transition-colors">{tool.name}</Link>
                <p className="text-xs text-muted-foreground mt-0.5">{tool.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/tools/${tool.slug}`}>
                  <Button variant="outline" size="sm">Open</Button>
                </Link>
                <button onClick={() => toggleFav(tool.slug)} className="p-2 rounded-lg hover:bg-destructive/10 text-warning hover:text-destructive cursor-pointer transition-colors">
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-16 text-muted-foreground">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No favorite tools yet</p>
            <p className="text-sm mt-1">Browse tools and mark your favorites</p>
            <Link href="/tools"><Button variant="outline" className="mt-4">Browse Tools</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
}
