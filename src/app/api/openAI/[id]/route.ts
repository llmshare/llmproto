import { NextRequest, NextResponse } from "next/server";

import { readFile, writeFile } from "@/db/utils";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  const parsedFile = await readFile(id);
  return NextResponse.json({ llm: parsedFile.llm });
}

export async function POST(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const { type, value } = await request.json();

  const parsedFile = await readFile(id);
  parsedFile.llm[type] = value;
  await writeFile(id, parsedFile);

  return NextResponse.json({ message: "success" });
}
