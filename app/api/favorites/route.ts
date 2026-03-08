import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth";

export async function GET(request) {
    const { error, user } = requireAuth(request);
    if (error) return error;

    await dbConnect();
    const userData = await User.findById(user.id).select("favorites");
    return NextResponse.json({ favorites: userData?.favorites || [] });
}

export async function POST(request) {
    const { error, user } = requireAuth(request);
    if (error) return error;

    await dbConnect();
    const { slug } = await request.json();
    if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

    const userData = await User.findById(user.id);
    if (!userData.favorites) userData.favorites = [];

    const index = userData.favorites.indexOf(slug);
    if (index > -1) {
        userData.favorites.splice(index, 1);
    } else {
        userData.favorites.push(slug);
    }

    await userData.save();
    return NextResponse.json({ favorites: userData.favorites });
}
