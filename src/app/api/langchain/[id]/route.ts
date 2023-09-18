import fs from "node:fs/promises";

import { NextRequest, NextResponse } from "next/server";
import path from "path";

import db from "@/db/db";

export async function GET(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const { id } = context.params;
  const file = await fs.readFile(path.join(db, `${id}.json`), "utf-8");
  return NextResponse.json(JSON.parse(file));
}
