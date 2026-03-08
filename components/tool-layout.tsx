"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOOL_CATEGORIES } from "@/lib/tools-registry";

export default function ToolLayout({ tool, children }) {
  const router = useRouter();
  const category = TOOL_CATEGORIES[tool.category];
  const Icon = tool.icon;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: `${category.color}15`,
                color: category.color,
              }}
            >
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {tool.name}
              </h1>
              <p className="text-muted-foreground mt-1">{tool.description}</p>
            </div>
            <Badge
              className="self-start sm:self-center"
              style={{
                background: `${category.color}15`,
                color: category.color,
                borderColor: `${category.color}30`,
              }}
            >
              {category.label}
            </Badge>
          </div>
        </motion.div>

        {/* Tool Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
