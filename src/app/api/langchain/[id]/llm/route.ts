import { NextRequest, NextResponse } from "next/server";

import { readFile, writeFile } from "@/db/utils";

export async function POST(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const { id } = context.params;

  const parsedFile = await readFile(id);
  const data = { ...parsedFile, llm: { type: "OpenAI", temperature: 0 } };
  await writeFile(id, data);

  return NextResponse.json({ success: true });
}
