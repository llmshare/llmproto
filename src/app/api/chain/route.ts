import { NextResponse } from "next/server";

import db from "@/db/database";
import { chain } from "@/db/schema";

// create an OpenAI model and store it
export async function POST() {
  const insertedId = await db
    .insert(chain)
    .values({ type: "map_reduce", returnIntermediateSteps: false })
    .returning({ insertedId: chain.id });

  const id = insertedId[0].insertedId;

  return NextResponse.json({ id });
}
