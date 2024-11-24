import { $Enums } from "@prisma/client";

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;
  isActive: boolean;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;
}
