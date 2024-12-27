//import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { getSession } from "@/utils/sessionManagement";
import { uploadImageToS3 } from "@/utils/fileUploader";

// POST /api/post
export async function POST(req: Request) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File | null;

  console.log(formData);

  if (!title || !content || !image) {
    return NextResponse.json(
      { error: "Title, image, and content are required." },
      { status: 400 }
    );
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const username = session?.user?.username; // Adjust based on session structure
  if (!username) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  console.log(`Current user: ${username}`);

  //const { title, content } = await req.json(); // try body? or formData()?

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const imageUrl = await uploadImageToS3(image);

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: user.id,
        image: imageUrl,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

