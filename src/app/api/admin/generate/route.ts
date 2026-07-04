import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/generate-blog";

function isAuthorized(request: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return process.env.NODE_ENV === "development";
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${password}`;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { draft, author } = await request.json();
    if (!draft?.trim()) {
      return NextResponse.json({ error: "Draft content is required." }, { status: 400 });
    }

    const post = await generateBlogPost(draft, author);
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Generation failed." }, { status: 500 });
  }
}
