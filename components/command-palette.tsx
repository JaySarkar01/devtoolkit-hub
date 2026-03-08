"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { TOOLS, TOOL_CATEGORIES } from "@/lib/tools-registry";

export default function CommandPalette({ open, onOpenChange }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const handleSelect = useCallback(
    (slug) => {
      router.push(`/tools/${slug}`);
      onOpenChange(false);
      setSearch("");
    },
    [router, onOpenChange]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-1/2 top-[15%] z-[101] w-[95%] max-w-xl -translate-x-1/2"
          >
            <Command
              className="glass rounded-2xl border border-border/60 shadow-2xl shadow-black/30 overflow-hidden"
              loop
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-5 border-b border-border/50">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search 26+ developer tools..."
                  className="flex-1 h-14 bg-transparent text-foreground text-base placeholder:text-muted-foreground outline-none"
                />
                <kbd className="hidden sm:flex px-2 py-1 rounded-md bg-muted text-[10px] font-mono text-muted-foreground border border-border">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <Command.List className="max-h-[50vh] overflow-y-auto p-2">
                <Command.Empty className="py-12 text-center text-sm text-muted-foreground">
                  No tools found. Try a different search term.
                </Command.Empty>

                {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => {
                  const categoryTools = TOOLS.filter((t) => t.category === key);
                  if (categoryTools.length === 0) return null;

                  return (
                    <Command.Group
                      key={key}
                      heading={cat.label}
                      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                    >
                      {categoryTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Command.Item
                            key={tool.slug}
                            value={`${tool.name} ${tool.description}`}
                            onSelect={() => handleSelect(tool.slug)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors data-[selected=true]:bg-accent/80 data-[selected=true]:text-foreground text-muted-foreground group"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                background: `${cat.color}15`,
                                color: cat.color,
                              }}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {tool.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {tool.description}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100 transition-opacity shrink-0" />
                          </Command.Item>
                        );
                      })}
                    </Command.Group>
                  );
                })}
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-border/50 text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border">
                      ↑↓
                    </kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border">
                      ↵
                    </kbd>
                    open
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-neon-cyan" />
                  {TOOLS.length} tools
                </div>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
