import { NextRequest, NextResponse } from "next/server";
import { aj } from "@/app/utils/arcjet";

export async function GET(req: NextRequest) {
  const userId = "user123"; // Replace with your authenticated user ID

  // Pass NextRequest to Arcjet
  const decision = await aj.protect(req, { userId, requested: 5 });

  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 },
    );
  }

  return NextResponse.json({ message: "Hello world" });
}
