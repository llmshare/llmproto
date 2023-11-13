import { NextRequest, NextResponse } from "next/server";

import { readFile, writeFile } from "@/db/utils";

export async function POST(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  const parsedFile = await readFile(id);
  const data = {
    ...parsedFile,
    textSplitter: {
      name: "RecursivelanguageCharacterTextSplitter",
      chunkSize: 50,
      chunkOverlap: 10,
      language: "",
    },
  };
  await writeFile(id, data);

  return NextResponse.json({ success: true });
}
