import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

export async function POST(request) {
    try {
        const { projectName, description, techStack, features } = await request.json();
        if (!projectName) {
            return NextResponse.json({ error: "Project name is required" }, { status: 400 });
        }

        const model = getGeminiModel();
        const prompt = `Generate a professional, well-structured README.md for a project with these details:

Project Name: ${projectName}
Description: ${description || "Not provided"}
Tech Stack: ${techStack || "Not specified"}
Key Features: ${features || "Not listed"}

Include these sections:
- Project title with description
- Features list
- Tech Stack section
- Installation/Setup instructions
- Usage examples
- Contributing guidelines
- License section

Use proper Markdown formatting with headers, code blocks, badges, and emojis where appropriate. Make it look professional and comprehensive.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const readme = response.text();

        return NextResponse.json({ readme });
    } catch (error) {
        console.error("AI readme error:", error);
        const message = error.message || "AI processing failed";
        if (message.includes("429") || message.includes("quota") || message.includes("Too Many Requests")) {
            return NextResponse.json({ error: "Gemini API rate limit exceeded. Your free tier quota has been used up. Please wait a minute and try again, or upgrade your Google AI plan." }, { status: 429 });
        }
        if (message.includes("API_KEY") || message.includes("GEMINI")) {
            return NextResponse.json({ error: "Gemini API key is not configured. Please set GEMINI_API_KEY in your .env.local file." }, { status: 500 });
        }
        return NextResponse.json({ error: `AI processing failed: ${message}` }, { status: 500 });
    }
}
