import { NextRequest, NextResponse } from "next/server";

import generateCode from "@/controllers/generateCode";

export async function POST(request: NextRequest) {
  const { openAIID } = await request.json();

  const code = await generateCode(openAIID);

  return NextResponse.json({ code });
}
