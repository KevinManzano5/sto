import { CreateUserDto, LoginUserDto, UserEntity } from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";
import { IAuthRepository } from "../../domain/repositories/IAuth.repository";
import { AuthDatasource } from "../datasources/postgres.auth.datasource";

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
