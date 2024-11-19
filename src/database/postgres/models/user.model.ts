export interface UserModel {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
