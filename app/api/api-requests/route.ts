import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ApiRequest from "@/models/ApiRequest";
import { requireAuth } from "@/lib/auth";

export async function GET(request) {
    const { error, user } = requireAuth(request);
    if (error) return error;

    await dbConnect();
    const requests = await ApiRequest.find({ userId: user.id }).sort({ createdAt: -1 });
    return NextResponse.json({ requests });
}

export async function POST(request) {
    const { error, user } = requireAuth(request);
    if (error) return error;

    await dbConnect();
    const { name, method, url, headers, body } = await request.json();
    if (!name || !url) {
        return NextResponse.json({ error: "Name and URL are required" }, { status: 400 });
    }

    const apiRequest = await ApiRequest.create({
        userId: user.id,
        name,
        method: method || "GET",
        url,
        headers: headers || "{}",
        body: body || "",
    });
    return NextResponse.json({ request: apiRequest }, { status: 201 });
}

export async function DELETE(request) {
    const { error, user } = requireAuth(request);
    if (error) return error;

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await ApiRequest.findOneAndDelete({ _id: id, userId: user.id });
    return NextResponse.json({ success: true });
}
