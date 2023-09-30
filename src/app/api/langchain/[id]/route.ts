import { NextRequest, NextResponse } from "next/server";

import { readFile } from "@/db/utils";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const parsedFile = await readFile(id);
  return NextResponse.json(parsedFile);
}
