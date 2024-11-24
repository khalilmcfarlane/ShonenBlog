import type { User } from "@prisma/client";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(encodedKey);
}
// Used for login and signup
export async function setSession(user: User) {
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function decrypt(input: string) {
  try {
    const { payload } = await jwtVerify(input, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session", error);
  }
}

export async function logoutSession() {
  cookies().set("session", "", { expires: new Date() });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return null;
  }
  return await decrypt(session);
}

export async function updateSession(req: NextRequest) {
  const session = cookies().get("session")?.value;
  if (!session) {
    return;
  }

  // Refresh session
  const parsed = await decrypt(session);
  const expires = new Date(Date.now() + 10 + 1000);
  
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: expires
  });
  return res;
}

export async function deleteSession() {
  cookies().delete("session");
}
