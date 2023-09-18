import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import db from "@/db/database";
import { chain } from "@/db/schema";
import { readFile, writeFile } from "@/db/utils";

export async function GET(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const data = await db
    .select()
    .from(chain)
    .where(eq(chain.id, context.params.id));
  return NextResponse.json({
    type: data[0].type,
    returnIntermediateSteps: data[0].returnIntermediateSteps,
  });
}

export async function POST(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const { id } = context.params;
  const { type, returnIntermediateSteps } = await request.json();

  const parsedFile = await readFile(id);

  if (type) parsedFile.chain.type = type;

  if (returnIntermediateSteps)
    parsedFile.chain.returnIntermediateSteps = returnIntermediateSteps;

  await writeFile(id, parsedFile);

  return NextResponse.json({ message: "success" });
}
