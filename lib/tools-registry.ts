import {
    Braces,
    CheckCircle,
    Binary,
    KeyRound,
    Regex,
    Fingerprint,
    Clock,
    Lock,
    FileText,
    Code2,
    Minimize2,
    Database,
    Send,
    Terminal,
    Palette,
    Image,
    Hash,
    GitCompare,
    Link,
    Type,
    Shuffle,
    Globe,
    Github,
    Sparkles,
    BookOpen,
    Camera,
} from "lucide-react";

export const TOOL_CATEGORIES = {
    formatters: { label: "Formatters & Validators", color: "#00e5ff" },
    encoders: { label: "Encoders & Decoders", color: "#b24aff" },
    generators: { label: "Generators", color: "#39ff14" },
    api: { label: "API & Web", color: "#ff2d7b" },
    text: { label: "Text & Code", color: "#ffab00" },
    ai: { label: "AI Powered", color: "#00e5ff" },
    analysis: { label: "Analysis", color: "#b24aff" },
};

export const TOOLS = [
    {
        name: "JSON Formatter",
        slug: "json-formatter",
        description: "Format and beautify JSON with syntax highlighting",
        icon: Braces,
        category: "formatters",
    },
    {
        name: "JSON Validator",
        slug: "json-validator",
        description: "Validate JSON syntax and display errors",
        icon: CheckCircle,
        category: "formatters",
    },
    {
        name: "Base64 Encoder/Decoder",
        slug: "base64-codec",
        description: "Encode and decode Base64 strings instantly",
        icon: Binary,
        category: "encoders",
    },
    {
        name: "JWT Decoder",
        slug: "jwt-decoder",
        description: "Decode and inspect JWT token payload and claims",
        icon: KeyRound,
        category: "encoders",
    },
    {
        name: "Regex Tester",
        slug: "regex-tester",
        description: "Test regular expressions with live matching",
        icon: Regex,
        category: "text",
    },
    {
        name: "UUID Generator",
        slug: "uuid-generator",
        description: "Generate random UUIDs (v4) in bulk",
        icon: Fingerprint,
        category: "generators",
    },
    {
        name: "Timestamp Converter",
        slug: "timestamp-converter",
        description: "Convert between Unix timestamps and dates",
        icon: Clock,
        category: "encoders",
    },
    {
        name: "Password Generator",
        slug: "password-generator",
        description: "Generate strong, secure passwords",
        icon: Lock,
        category: "generators",
    },
    {
        name: "Markdown Preview",
        slug: "markdown-preview",
        description: "Write Markdown and preview rendered output live",
        icon: FileText,
        category: "text",
    },
    {
        name: "Code Beautifier",
        slug: "code-beautifier",
        description: "Beautify and format JavaScript, CSS, and HTML code",
        icon: Code2,
        category: "formatters",
    },
    {
        name: "Code Minifier",
        slug: "code-minifier",
        description: "Minify code by removing whitespace and comments",
        icon: Minimize2,
        category: "formatters",
    },
    {
        name: "SQL Formatter",
        slug: "sql-formatter",
        description: "Format and beautify SQL queries for readability",
        icon: Database,
        category: "formatters",
    },
    {
        name: "API Tester",
        slug: "api-tester",
        description: "Mini Postman — send HTTP requests and inspect responses",
        icon: Send,
        category: "api",
    },
    {
        name: "cURL Generator",
        slug: "curl-generator",
        description: "Generate cURL commands from HTTP request config",
        icon: Terminal,
        category: "api",
    },
    {
        name: "Color Converter",
        slug: "color-converter",
        description: "Convert colors between HEX, RGB, HSL formats",
        icon: Palette,
        category: "generators",
    },
    {
        name: "Image to Base64",
        slug: "image-to-base64",
        description: "Convert images to Base64-encoded strings",
        icon: Image,
        category: "encoders",
    },
    {
        name: "Hash Generator",
        slug: "hash-generator",
        description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes",
        icon: Hash,
        category: "generators",
    },
    {
        name: "Diff Checker",
        slug: "diff-checker",
        description: "Compare two texts and highlight differences",
        icon: GitCompare,
        category: "text",
    },
    {
        name: "URL Encoder/Decoder",
        slug: "url-codec",
        description: "Encode and decode URLs and query parameters",
        icon: Link,
        category: "encoders",
    },
    {
        name: "Lorem Ipsum Generator",
        slug: "lorem-ipsum-generator",
        description: "Generate placeholder text for designs and mockups",
        icon: Type,
        category: "generators",
    },
    {
        name: "Random Data Generator",
        slug: "random-data-generator",
        description: "Generate random names, emails, addresses, and more",
        icon: Shuffle,
        category: "generators",
    },
    {
        name: "Meta Tag Generator",
        slug: "meta-tag-generator",
        description: "Generate SEO meta tags for your web pages",
        icon: Globe,
        category: "api",
    },
    {
        name: "GitHub Repo Analyzer",
        slug: "github-analyzer",
        description: "Analyze any GitHub repository — stats, languages, activity",
        icon: Github,
        category: "analysis",
    },
    {
        name: "AI Code Explainer",
        slug: "ai-code-explainer",
        description: "Paste code and get an AI-powered explanation",
        icon: Sparkles,
        category: "ai",
    },
    {
        name: "AI README Generator",
        slug: "ai-readme-generator",
        description: "Generate a professional README from your project details",
        icon: BookOpen,
        category: "ai",
    },
    {
        name: "Code Screenshot",
        slug: "code-screenshot",
        description: "Create beautiful, shareable code screenshots",
        icon: Camera,
        category: "text",
    },
];

export function getToolBySlug(slug) {
    return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category) {
    return TOOLS.filter((tool) => tool.category === category);
}

export function searchTools(query) {
    const q = query.toLowerCase();
    return TOOLS.filter(
        (tool) =>
            tool.name.toLowerCase().includes(q) ||
            tool.description.toLowerCase().includes(q) ||
            tool.slug.toLowerCase().includes(q)
    );
}
