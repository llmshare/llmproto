import fs from "node:fs/promises";

import path from "path";

import db from "@/db/db";

export async function readFile(id: string) {
  const file = await fs.readFile(path.join(db, `${id}.json`), "utf-8");
  return JSON.parse(file);
}

export async function writeFile(id: string, data: any) {
  await fs.writeFile(path.join(db, `${id}.json`), JSON.stringify(data), {
    flag: "w+",
  });
}

export async function post(id: string, data: any) {
  const structured = { ...data, id };
  try {
    await writeFile(id, structured);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
