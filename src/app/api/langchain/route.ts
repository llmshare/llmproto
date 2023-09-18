import { NextRequest, NextResponse } from "next/server";

// import { v4 as uuidv4 } from "uuid";
import { post } from "@/db/utils";

export async function POST(request: NextRequest) {
  // const id = uuidv4();
  const id = "data";
  const data = await request.json();

  await post(id, data);

  return NextResponse.json({ success: true, id });
}

export async function GET() {
  return NextResponse.json({ success: true });
}
