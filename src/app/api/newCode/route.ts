import { NextResponse } from "next/server";

import db from "@/db/pouchDB";

export async function GET() {
  try {
    const res = await db.info();

    return NextResponse.json({ id: 10 });
  } catch (e) {
    console.log({ e });
  }
}
