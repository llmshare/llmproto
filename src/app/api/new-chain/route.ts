import { NextRequest, NextResponse } from "next/server";

import { post } from "@/db/utils";

export async function POST(request: NextRequest) {
  const data = await request.json();

  console.log({ data });

  await post(data);

  return NextResponse.json({ success: true });
}
