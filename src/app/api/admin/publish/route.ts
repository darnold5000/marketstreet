import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

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
    const post = await request.json();
    if (!post.slug || !post.title || !post.content) {
      return NextResponse.json({ error: "Invalid post data." }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/content/blog-posts.json");
    const existing = JSON.parse(await readFile(filePath, "utf-8"));
    const filtered = existing.filter((p: { slug: string }) => p.slug !== post.slug);
    const { schema: _schema, ...postData } = post;
    filtered.unshift(postData);
    await writeFile(filePath, JSON.stringify(filtered, null, 2));

    return NextResponse.json({ success: true, slug: post.slug });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Publish failed";
    return NextResponse.json(
      { error: message, hint: "File writes work in development. For production, integrate a CMS or database." },
      { status: 500 }
    );
  }
}
