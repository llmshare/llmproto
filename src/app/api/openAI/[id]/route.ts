import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import db from "@/db/database";
import { openAI } from "@/db/schema";

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
  const { temperature } = await request.json();

  await db
    .update(openAI)
    .set({ temperature })
    .where(eq(openAI.id, context.params.id));

  return NextResponse.json({ message: "success" });
}
