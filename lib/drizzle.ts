import "../envConfig.ts";
import { drizzle } from "drizzle-orm/neon-http";

export const client = drizzle(process.env.DATABASE_URL!);
