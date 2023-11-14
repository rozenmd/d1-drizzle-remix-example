import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const articles = sqliteTable(
  "articles",
  {
    slug: text("slug").primaryKey().notNull(),
    title: text("title"),
    excerpt: text("excerpt"),
    content: text("content"),
    author: text("author"),
    publishedOn: integer("published_on").notNull(), //{ mode: "timestamp" } is broken
    createdAt: integer("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`), //{ mode: "timestamp" } is broken
  },
  (articles) => ({
    slugIdx: uniqueIndex("slugIdx").on(articles.slug),
    nameIdx: uniqueIndex("nameIdx").on(articles.title),
  })
);
