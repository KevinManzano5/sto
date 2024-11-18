import "dotenv/config";
import { get } from "env-var";

export const envs = {
  API_VERSION: get("API_VERSION").default("v1").asString(),
  JWT_SECRET: get("JWT_SECRET").required().asString(),
  NODE_ENV: get("NODE_ENV").default("development").asString(),
  PORT: get("PORT").required().asPortNumber(),
  POSTGRES_DB: get("POSTGRES_DB").required().asString(),
  POSTGRES_PASSWORD: get("POSTGRES_PASSWORD").required().asString(),
  POSTGRES_PORT: get("POSTGRES_PORT").required().asString(),
  POSTGRES_URL: get("POSTGRES_URL").required().asString(),
  POSTGRES_USER: get("POSTGRES_USER").required().asString(),
};
