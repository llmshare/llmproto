import { integer, real, sqliteTable } from "drizzle-orm/sqlite-core";

export const openAI = sqliteTable("openAI", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  temperature: real("temperature").notNull(),
});
