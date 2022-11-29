import { registerAs } from "@nestjs/config";

export const dbConfig = registerAs('database', () => ({
  database: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: parseInt(process.env.MONGO_PORT, 10),
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  authBase: process.env.MONGO_AUTH_BASE,
}));
