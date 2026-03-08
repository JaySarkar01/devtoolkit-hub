import { NextResponse } from "next/server";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(request) {
    try {
        const { owner, repo } = await request.json();
        if (!owner || !repo) {
            return NextResponse.json({ error: "Owner and repo are required" }, { status: 400 });
        }

        // Clean owner/repo values
        const cleanOwner = owner.trim();
        const cleanRepo = repo.trim().replace(/\.git$/, "");

        const headers = GITHUB_TOKEN
            ? { Authorization: `token ${GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json" }
            : { Accept: "application/vnd.github.v3+json" };

        // Fetch repo first to validate it exists
        let repoData;
        try {
            const repoRes = await axios.get(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}`, { headers });
            repoData = repoRes.data;
        } catch (err) {
            if (err.response?.status === 404) {
                return NextResponse.json({ error: `Repository '${cleanOwner}/${cleanRepo}' not found. Make sure it exists and is public.` }, { status: 404 });
            }
            throw err;
        }

        // Fetch languages and contributors in parallel
        const [languagesRes, contributorsRes] = await Promise.allSettled([
            axios.get(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}/languages`, { headers }),
            axios.get(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contributors?per_page=10`, { headers }),
        ]);

        return NextResponse.json({
            repo: repoData,
            languages: languagesRes.status === "fulfilled" ? languagesRes.value.data : {},
            contributors: contributorsRes.status === "fulfilled" ? contributorsRes.value.data : [],
        });
    } catch (error) {
        console.error("GitHub analyze error:", error.response?.data || error.message);
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Failed to analyze repository";
        return NextResponse.json({ error: message }, { status });
    }
}
