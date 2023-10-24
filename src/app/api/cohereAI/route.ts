import { NextResponse } from "next/server";

import db from "@/db/database";
import { cohereAI } from "@/db/schema";

// create an OpenAI model and store it
export async function POST() {
  const insertedId = await db
    .insert(cohereAI)
    .values({ temperature: 0 })
    .returning({ insertedId: cohereAI.id });

  const id = insertedId[0].insertedId;

  return NextResponse.json({ id });
}
