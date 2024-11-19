import { UserModel } from "../../database";
import { CreateUserDto, LoginUserDto } from "../dtos";

export interface IAuthDatasource {
  createUser: (createUserDto: CreateUserDto) => Promise<UserModel>;
  loginUser: (loginUserDto: LoginUserDto) => Promise<UserModel>;
  findUser: (id: string) => Promise<UserModel>;
}
