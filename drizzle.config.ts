import type { Config } from "drizzle-kit";

export default {
  schema: "./app/db",
  out: "./migrations",
} satisfies Config;
