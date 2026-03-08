"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TOOL_CATEGORIES } from "@/lib/tools-registry";

export default function ToolCard({ tool, index = 0 }) {
  const Icon = tool.icon;
  const category = TOOL_CATEGORIES[tool.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
    >
      <Link href={`/tools/${tool.slug}`} className="block group">
        <div className="glass-card p-5 h-full flex flex-col gap-4">
          {/* Icon */}
          <div className="flex items-center justify-between">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{
                background: `${category.color}12`,
                color: category.color,
                boxShadow: `0 0 0 rgba(0,0,0,0)`,
              }}
            >
              <Icon className="w-5.5 h-5.5" />
            </div>
            <ArrowRight
              className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-semibold text-[15px] text-foreground mb-1.5 group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {tool.description}
            </p>
          </div>

          {/* Category Tag */}
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider"
              style={{
                background: `${category.color}10`,
                color: category.color,
              }}
            >
              {category.label}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
