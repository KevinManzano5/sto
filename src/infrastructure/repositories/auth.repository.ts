import {
  CreateUserDto,
  CustomError,
  IAuthRepository,
  LoginUserDto,
  UserEntity,
} from "../../domain";
import { AuthDatasource } from "../";

export class AuthRepository implements IAuthRepository {
  constructor(public readonly authDatasource: AuthDatasource) {}

  createUser = async (createUserDto: CreateUserDto): Promise<UserEntity> => {
    try {
      const user = await this.authDatasource.createUser(createUserDto);

      return UserEntity.fromObject(user);
    } catch (error: any) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  loginUser = async (loginUserDto: LoginUserDto): Promise<UserEntity> => {
    try {
      const user = await this.authDatasource.loginUser(loginUserDto);

      return UserEntity.fromObject(user);
    } catch (error: any) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
