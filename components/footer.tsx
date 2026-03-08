import Link from "next/link";
import { Github, Twitter, Heart, Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <Wrench className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-bold text-lg">
                Dev<span className="gradient-text">Toolkit</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              A high-performance developer utility platform. Access 26+ essential
              tools in one place — format, encode, generate, analyze and more.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Popular Tools</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/tools/json-formatter", label: "JSON Formatter" },
                { href: "/tools/api-tester", label: "API Tester" },
                { href: "/tools/regex-tester", label: "Regex Tester" },
                { href: "/tools/password-generator", label: "Password Generator" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/tools", label: "All Tools" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/login", label: "Login" },
                { href: "/register", label: "Sign Up" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-8 border-t border-border/50 gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DevToolkit Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="w-3 h-3 text-neon-pink mx-0.5" /> for developers
          </div>
        </div>
      </div>
    </footer>
  );
}
