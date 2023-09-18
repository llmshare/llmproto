import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import db from "@/db/database";
import { openAI } from "@/db/schema";
import { readFile, writeFile } from "@/db/utils";

// create an OpenAI model and store it
export async function GET(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const data = await db
    .select()
    .from(openAI)
    .where(eq(openAI.id, context.params.id));
  return NextResponse.json({ temperature: data[0].temperature });
}

export async function POST(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const { id } = context.params;
  const { temperature } = await request.json();

  const parsedFile = await readFile(id);
  const data = { ...parsedFile, llm: { ...parsedFile.llm, temperature } };
  await writeFile(id, data);

  return NextResponse.json({ message: "success" });
}
