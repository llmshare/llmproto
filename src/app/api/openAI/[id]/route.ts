import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/app/db/database";
import { openAI } from "@/app/db/schema";

// create an OpenAI model and store it
export async function GET() {
  const data = await db.select().from(openAI).where(eq(openAI.id, 10));
  return NextResponse.json({ temperature: data[0].temperature });
}

export async function POST(request: Request) {
  const { temperature } = await request.json();

  await db.update(openAI).set({ temperature }).where(eq(openAI.id, 10));

  return NextResponse.json({ temperature });
}
