import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

export async function POST(request) {
    try {
        const { code } = await request.json();
        if (!code) {
            return NextResponse.json({ error: "Code is required" }, { status: 400 });
        }

        const model = getGeminiModel();
        const prompt = `You are an expert code explainer. Analyze the following code and provide a clear, detailed explanation. Break down:
1. What the code does overall
2. Key functions/methods and their purposes
3. Important logic and algorithms used
4. Any notable patterns or best practices

Be concise but thorough. Use simple language. Format with numbered points and clear sections.

Code:
\`\`\`
${code}
\`\`\``;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const explanation = response.text();

        return NextResponse.json({ explanation });
    } catch (error) {
        console.error("AI explain error:", error);
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
