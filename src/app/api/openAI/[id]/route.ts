import { NextRequest, NextResponse } from "next/server";

import { readFile, writeFile } from "@/db/utils";

export async function GET(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const { id } = context.params;

  const parsedFile = await readFile(id);
  return NextResponse.json({ llm: parsedFile.llm });
}

export async function POST(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const { id } = context.params;
  const { temperature } = await request.json();

  const parsedFile = await readFile(id);
  parsedFile.llm.temperature = temperature;
  await writeFile(id, parsedFile);

  return NextResponse.json({ message: "success" });
}
