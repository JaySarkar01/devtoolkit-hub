"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import ToolCard from "@/components/tool-card";
import { TOOLS, TOOL_CATEGORIES, searchTools } from "@/lib/tools-registry";

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = useMemo(() => {
    let results = search ? searchTools(search) : TOOLS;
    if (activeCategory !== "all") {
      results = results.filter((t) => t.category === activeCategory);
    }
    return results;
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-2">
            All <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Browse and search through all {TOOLS.length} developer tools
          </p>

          {/* Search */}
          <div className="max-w-md mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools..."
                className="w-full h-11 pl-11 pr-4 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              All ({TOOLS.length})
            </button>
            {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => {
              const count = TOOLS.filter((t) => t.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeCategory === key ? "shadow-lg" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  style={
                    activeCategory === key
                      ? { background: `${cat.color}20`, color: cat.color }
                      : {}
                  }
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No tools found</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-3 text-primary hover:underline text-sm cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
