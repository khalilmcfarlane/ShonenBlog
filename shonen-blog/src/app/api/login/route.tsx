import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { setSession } from "@/utils/sessionManagement";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const formData = await req.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    );
  }

  // If username given is found in Prisma and
  // Password matches user.password's hashed, login
  // Password check: const isValid = await bcrypt.compare(enteredPassword, storedHashedPassword);

  try {
    // unhash password in db
    // Try to find the user
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: `No user exists with the name ${username}.` },
        { status: 404 }
      );
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    // if this is the correct password
    if (isValidPassword) {
      console.log(`Logging into ${existingUser.username}.`);
      // Set the user session
      setSession(existingUser);
      return NextResponse.json({ status: 200 });
    }
  } catch (error) {
    console.error(`Error logging into ${username}.`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
