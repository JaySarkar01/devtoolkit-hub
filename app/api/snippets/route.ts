import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Snippet from "@/models/Snippet";
import { requireAuth } from "@/lib/auth";

export async function GET(request) {
    const { error, user } = requireAuth(request);
    if (error) return error;

    await dbConnect();
    const snippets = await Snippet.find({ userId: user.id }).sort({ createdAt: -1 });
    return NextResponse.json({ snippets });
}

export async function POST(request) {
    const { error, user } = requireAuth(request);
    if (error) return error;

    await dbConnect();
    const { title, code, language } = await request.json();
    if (!title || !code) {
        return NextResponse.json({ error: "Title and code are required" }, { status: 400 });
    }

    const snippet = await Snippet.create({ userId: user.id, title, code, language: language || "javascript" });
    return NextResponse.json({ snippet }, { status: 201 });
}

export async function DELETE(request) {
    const { error, user } = requireAuth(request);
    if (error) return error;

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Snippet.findOneAndDelete({ _id: id, userId: user.id });
    return NextResponse.json({ success: true });
}
