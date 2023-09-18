import { NextRequest, NextResponse } from "next/server";

import { post } from "@/db/utils";

export async function POST(request: NextRequest) {
  const data = await request.json();

  await post(data);

  return NextResponse.json({ success: true, id: 1 });
}

export async function GET() {
  return NextResponse.json({ success: true });
}
