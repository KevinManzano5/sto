import { compareSync, hashSync } from "bcrypt";

export const bcrypt = {
  compare: (data: string, encrypted: string): boolean => {
    return compareSync(data, encrypted);
  },

  hash: (data: string): string => {
    return hashSync(data, 10);
  },
};
