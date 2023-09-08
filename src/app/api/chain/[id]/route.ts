import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import db from "@/db/database";
import { chain, openAI } from "@/db/schema";

// create an OpenAI model and store it
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
  const { type, returnIntermediateSteps } = await request.json();

  if (type)
    await db.update(chain).set({ type }).where(eq(chain.id, context.params.id));

  if (returnIntermediateSteps)
    await db
      .update(chain)
      .set({ returnIntermediateSteps })
      .where(eq(chain.id, context.params.id));

  return NextResponse.json({ message: "success" });
}
