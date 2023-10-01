import { NextRequest, NextResponse } from "next/server";

import { readFile, writeFile } from "@/db/utils";

export async function GET() {
  return NextResponse.json({ success: true });
}

export async function POST(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const { type, value } = await request.json();

  const parsedFile = await readFile(id);
  parsedFile.chain[type] = value;
  await writeFile(id, parsedFile);

  return NextResponse.json({ message: "success" });
}
