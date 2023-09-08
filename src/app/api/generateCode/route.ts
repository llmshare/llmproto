import { NextRequest, NextResponse } from "next/server";

import generateCode from "@/controllers/generateCode";

export async function POST(request: NextRequest) {
  const { openAIID, chainID } = await request.json();

  const code = await generateCode(openAIID, chainID);

  return NextResponse.json({ code });
}
