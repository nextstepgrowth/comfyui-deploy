import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle(
  new Pool({
    connectionString: process.env.POSTGRES_URL,
  }),
  {
    schema,
  }
);
