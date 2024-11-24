import {
  CreateUserDto,
  CustomError,
  IAuthDatasource,
  IAuthRepository,
  LoginUserDto,
  UserEntity,
} from "../../domain";

export class AuthRepository implements IAuthRepository {
  constructor(public readonly authDatasource: IAuthDatasource) {}

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

  findUser = async (id: string): Promise<UserEntity> => {
    try {
      const user = await this.authDatasource.findUser(id);

      return UserEntity.fromObject(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
