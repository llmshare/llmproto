import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const openAI = sqliteTable("openAI", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  temperature: real("temperature").notNull(),
});

export const chain = sqliteTable("chain", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  type: text("type", { enum: ["map_reduce", "refine", "stuff"] })
    .notNull()
    .default("map_reduce"),
  returnIntermediateSteps: integer("returnIntermediateSteps", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
});
