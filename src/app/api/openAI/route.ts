import { NextResponse } from "next/server";

import db from "@/app/db/database";
import { openAI } from "@/app/db/schema";

// create an OpenAI model and store it
export async function POST() {
  const insertedId = await db
    .insert(openAI)
    .values({ temperature: 0 })
    .returning({ insertedId: openAI.id });

  const id = insertedId[0].insertedId;

  return NextResponse.json({ id });
}
