import jwt from "jsonwebtoken";

import { envs } from "../../config";

export const Jwt = {
  sign: (payload: { [key: string]: any }): string => {
    return jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "2h" });
  },

  verify: (token: string) => {
    return jwt.verify(token, envs.JWT_SECRET);
  },
};
