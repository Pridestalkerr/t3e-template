import { z } from "zod";
import { validate } from "./env";

const server = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const client = z.object({
  // REDIS_URL: z.string().url(),
  NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
});

export const env = validate(server, client, {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
});
