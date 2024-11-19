import { CreateUserDto, LoginUserDto } from "../dtos";
import { UserEntity } from "../entities";

export interface IAuthRepository {
  createUser: (createUserDto: CreateUserDto) => Promise<UserEntity>;
  loginUser: (loginUserDto: LoginUserDto) => Promise<UserEntity>;
  findUser: (id: string) => Promise<UserEntity>;
}
