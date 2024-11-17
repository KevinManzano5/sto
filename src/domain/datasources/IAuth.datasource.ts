import { UserModel } from "../../database/postgres/models/user.model";
import { CreateUserDto, LoginUserDto } from "../dtos";

export interface IAuthDatasource {
  createUser: (createUserDto: CreateUserDto) => Promise<UserModel>;
  loginUser: (loginUserDto: LoginUserDto) => void;
}
