import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, variant, style, ...props }: any) {
  const variantClasses: Record<string, string> = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    destructive: "border-transparent bg-destructive text-white",
    outline: "text-foreground",
    glass: "border-border/50 bg-glass text-foreground backdrop-blur-sm",
    neon: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
    success: "border-transparent bg-success/20 text-success",
    warning: "border-transparent bg-warning/20 text-warning",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantClasses[variant || "default"],
        className
      )}
      style={style}
      {...props}
    />
  );
}

export { Badge };
