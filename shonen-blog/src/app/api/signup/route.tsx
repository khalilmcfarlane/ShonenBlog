import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { hashPassword } from "@/utils/password";
import { uploadImagetoS3 } from "@/utils/fileUploader";

export async function POST(req: Request) {
  // If email in db, return an error.
  const formData = await req.formData();
  const name = formData.get("name") as string;
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
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }
    // Hash password
    const hashedPassword = await hashPassword(password);
    // Upload image to S3 bucket
    const imageUrl = image ? await uploadImagetoS3(image) : null;

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        image: imageUrl,
      },
    });

    console.log(`Created new user ${user.name}`);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating new user", error);
    return NextResponse.json(
      { errorr: "Internal server error" },
      { status: 500 }
    );
  }
}
