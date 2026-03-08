"use client";

import { use } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/tools-registry";
import ToolLayout from "@/components/tool-layout";
import { Skeleton } from "@/components/ui/skeleton";

const ToolLoading = () => (
  <div className="space-y-4">
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-64 w-full" />
  </div>
);

const toolComponents = {
  "json-formatter": dynamic(() => import("@/components/tools/json-formatter"), { loading: ToolLoading }),
  "json-validator": dynamic(() => import("@/components/tools/json-validator"), { loading: ToolLoading }),
  "base64-codec": dynamic(() => import("@/components/tools/base64-codec"), { loading: ToolLoading }),
  "jwt-decoder": dynamic(() => import("@/components/tools/jwt-decoder"), { loading: ToolLoading }),
  "regex-tester": dynamic(() => import("@/components/tools/regex-tester"), { loading: ToolLoading }),
  "uuid-generator": dynamic(() => import("@/components/tools/uuid-generator"), { loading: ToolLoading }),
  "timestamp-converter": dynamic(() => import("@/components/tools/timestamp-converter"), { loading: ToolLoading }),
  "password-generator": dynamic(() => import("@/components/tools/password-generator"), { loading: ToolLoading }),
  "markdown-preview": dynamic(() => import("@/components/tools/markdown-preview"), { loading: ToolLoading }),
  "code-beautifier": dynamic(() => import("@/components/tools/code-beautifier"), { loading: ToolLoading }),
  "code-minifier": dynamic(() => import("@/components/tools/code-minifier"), { loading: ToolLoading }),
  "sql-formatter": dynamic(() => import("@/components/tools/sql-formatter"), { loading: ToolLoading }),
  "api-tester": dynamic(() => import("@/components/tools/api-tester"), { loading: ToolLoading }),
  "curl-generator": dynamic(() => import("@/components/tools/curl-generator"), { loading: ToolLoading }),
  "color-converter": dynamic(() => import("@/components/tools/color-converter"), { loading: ToolLoading }),
  "image-to-base64": dynamic(() => import("@/components/tools/image-to-base64"), { loading: ToolLoading }),
  "hash-generator": dynamic(() => import("@/components/tools/hash-generator"), { loading: ToolLoading }),
  "diff-checker": dynamic(() => import("@/components/tools/diff-checker"), { loading: ToolLoading }),
  "url-codec": dynamic(() => import("@/components/tools/url-codec"), { loading: ToolLoading }),
  "lorem-ipsum-generator": dynamic(() => import("@/components/tools/lorem-ipsum-generator"), { loading: ToolLoading }),
  "random-data-generator": dynamic(() => import("@/components/tools/random-data-generator"), { loading: ToolLoading }),
  "meta-tag-generator": dynamic(() => import("@/components/tools/meta-tag-generator"), { loading: ToolLoading }),
  "github-analyzer": dynamic(() => import("@/components/tools/github-analyzer"), { loading: ToolLoading }),
  "ai-code-explainer": dynamic(() => import("@/components/tools/ai-code-explainer"), { loading: ToolLoading }),
  "ai-readme-generator": dynamic(() => import("@/components/tools/ai-readme-generator"), { loading: ToolLoading }),
  "code-screenshot": dynamic(() => import("@/components/tools/code-screenshot"), { loading: ToolLoading }),
};

export default function ToolPage({ params }: any) {
  const { toolName } = use(params) as any;
  const tool = getToolBySlug(toolName);

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[toolName];

  if (!ToolComponent) {
    notFound();
  }

  return (
    <ToolLayout tool={tool}>
      <ToolComponent />
    </ToolLayout>
  );
}
