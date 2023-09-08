import { integer, real, sqliteTable } from "drizzle-orm/sqlite-core";

// eslint-disable-next-line import/prefer-default-export
export const openAI = sqliteTable("openAI", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  temperature: real("temperature").notNull(),
});
