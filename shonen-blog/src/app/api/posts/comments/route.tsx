import { prisma } from "@/db";
import { getSession } from "@/utils/sessionManagement";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

// Create comment
export async function POST(req: Request) {
  const formData = await req.formData();
  const postId = formData.get("postId") as string;
  //const authorId = formData.get("authorId") as string;
  const content = formData.get("content") as string;

  console.log(formData);

  if (!postId || !content) {
    return NextResponse.json(
      { error: "Post id and content are required." },
      { status: 400 }
    );
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser: User = session.user as User;
  const authorId = currentUser.id; // Adjust based on session structure

  //const { postId, authorId, content } = await req.json();
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error commenting:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
