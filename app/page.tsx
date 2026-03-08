"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ToolCard from "@/components/tool-card";
import { TOOLS, TOOL_CATEGORIES, searchTools } from "@/lib/tools-registry";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "All tools run client-side for instant results",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "Your data never leaves your browser",
  },
  {
    icon: Globe,
    title: "26+ Tools",
    desc: "Everything a developer needs in one place",
  },
];

export default function HomePage() {
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
    <div className="min-h-screen">
      {/* ══ Hero Section ══ */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(178,74,255,0.1) 50%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="neon" className="mb-6 text-xs px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              26+ Developer Tools — All Free
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight font-[family-name:var(--font-heading)] mb-6">
              Your Swiss Army Knife
              <br />
              <span className="gradient-text">for Development</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Format, encode, generate, test, and analyze — all from one
              beautifully crafted platform. Built for developers who value speed
              and efficiency.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto mb-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tools... (or press ⌘K)"
                  className="w-full h-13 pl-12 pr-4 rounded-xl glass-input text-base"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="gap-2 text-base" asChild>
                <a href="#tools">
                  Explore Tools
                  <ArrowRight className="w-4.5 h-4.5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-base" asChild>
                <a href="/register">Create Account</a>
              </Button>
            </div>
          </motion.div>

          {/* Features Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="glass-card p-5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ Tools Grid Section ══ */}
      <section id="tools" className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              All Tools
            </button>
            {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === key
                    ? "shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                style={
                  activeCategory === key
                    ? {
                        background: `${cat.color}20`,
                        color: cat.color,
                        boxShadow: `0 4px 15px ${cat.color}15`,
                      }
                    : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tools Count */}
          <div className="text-sm text-muted-foreground mb-6">
            Showing {filteredTools.length} tool
            {filteredTools.length !== 1 ? "s" : ""}
          </div>

          {/* Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((tool, i) => (
                <ToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No tools found matching &ldquo;{search}&rdquo;
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-4 text-primary hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
