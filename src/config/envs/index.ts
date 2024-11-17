import "dotenv/config";
import { get } from "env-var";

export const envs = {
  API_VERSION: get("API_VERSION").default("v1").asString(),
  PORT: get("PORT").required().asPortNumber(),
};
