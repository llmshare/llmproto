import fs from "node:fs/promises";

import path from "path";

import db from "@/db/db";

export async function post(data: any) {
  const structured = { ...data, id: 1 };
  try {
    await fs.writeFile(path.join(db, "1.json"), JSON.stringify(structured), {
      flag: "w",
    });
  } catch (err) {
    console.log("this is effed");
    console.log(err);
  }
}

export async function get() {
  try {
    const file = await fs.readFile(`${path.join(db, "1.json")}`, "utf-8");

    return JSON.parse(file);
  } catch (err) {
    console.log(err);
    return err;
  }
}
