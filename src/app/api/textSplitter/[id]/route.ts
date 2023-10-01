import { NextRequest, NextResponse } from "next/server";

import { readFile, writeFile } from "@/db/utils";

export async function POST(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const { type, value } = await request.json();

  const parsedFile = await readFile(id);
  parsedFile.textSplitter[type] = value;
  await writeFile(id, parsedFile);

  return NextResponse.json({ message: "success" });
}
