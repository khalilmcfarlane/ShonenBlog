//import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { prisma } from "@/db";

// POST /api/post
export async function POST(req: Request) {
  /*
  if (res.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }
  */
  
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json(); // try body? or formData()?
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: user.id,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { errorr: "Internal server error" },
      { status: 500 }
    );
  }
}
