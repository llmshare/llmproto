import { NextRequest, NextResponse } from "next/server";

import generateCode from "@/controllers/generateCode";
import { readFile } from "@/db/utils";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  const parsedFile = await readFile(id);
  const { chain, llm } = parsedFile;

  const code = await generateCode(chain, llm);

  return NextResponse.json({ code });
}
