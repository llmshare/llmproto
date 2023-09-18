import fs from "node:fs/promises";

import path from "path";

import db from "@/db/db";

export async function readFile(id: number) {
  const file = await fs.readFile(path.join(db, `${id}.json`), "utf-8");
  return JSON.parse(file);
}

export async function writeFile(id: number, data: any) {
  await fs.writeFile(path.join(db, `${id}.json`), JSON.stringify(data), {
    flag: "w+",
  });
}

export async function post(data: any) {
  const id = 1;
  const structured = { ...data, id };
  try {
    await writeFile(id, structured);
  } catch (err) {
    console.log(err);
  }
}
