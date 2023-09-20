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
  const { type, returnIntermediateSteps } = await request.json();

  console.log({ type, returnIntermediateSteps });

  const parsedFile = await readFile(id);

  if (type) parsedFile.chain.type = type;

  if (typeof returnIntermediateSteps === "boolean")
    parsedFile.chain.returnIntermediateSteps = returnIntermediateSteps;

  await writeFile(id, parsedFile);

  return NextResponse.json({ message: "success" });
}
