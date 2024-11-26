//import "server-only";

import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { hashPassword } from "@/utils/password";
import { uploadImageToS3 } from "@/utils/fileUploader";
import { setSession } from "@/utils/sessionManagement";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // do I need to check for an error below?
  const image = formData.get("image") as File | null;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email and password are required" },
      { status: 400 }
    );
  }

  //const { name, email, password } = await req.json();

  try {
    // If existing user exists, don't create again
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingEmail || existingUser) {
      return NextResponse.json(
        { error: "A user with this email/username already exists" },
        { status: 409 }
      );
    }
    // Hash password
    const hashedPassword = await hashPassword(password);
    // Upload image to S3 bucket
    const imageUrl = image ? await uploadImageToS3(image) : null;

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        image: imageUrl,
      },
    });

    console.log(`Created new user ${user.username}`);
    // Set user session
    await setSession(user);
    console.log("Cookies after setting session", cookies().getAll());
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating new user", error);
    return NextResponse.json(
      { errorr: "Internal server error" },
      { status: 500 }
    );
  }
}
