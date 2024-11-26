import { logoutSession } from "@/utils/sessionManagement";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Logging out of session...");
    await logoutSession();
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during logout: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
