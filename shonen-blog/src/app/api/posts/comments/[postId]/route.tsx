import { prisma } from "@/db";
import { NextResponse } from "next/server";

interface commentParams {
  params: {
    postId: string;
  };
}

/*
    Retrieve all comments from Post.
*/
export async function GET(req: Request, { params }: commentParams) {
  const { postId } = params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch comments",
      },
      { status: 500 }
    );
  }
}
