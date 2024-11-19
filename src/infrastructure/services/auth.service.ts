import {
  CreateUserDto,
  CustomError,
  LoginUserDto,
  UserEntity,
} from "../../domain";
import { AuthRepository, bcrypt, Jwt } from "../";

export class AuthService {
  constructor(public readonly authRepository: AuthRepository) {}

  createUser = async (
    createUserDto: CreateUserDto
  ): Promise<{ user: UserEntity; token: string }> => {
    createUserDto.password = bcrypt.hash(createUserDto.password);

    try {
      const user = await this.authRepository.createUser(createUserDto);

      const token = Jwt.sign({ id: user.id });

      return {
        user,
        token,
      };
    } catch (error: any) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  loginUser = async (
    loginUserDto: LoginUserDto
  ): Promise<{ user: UserEntity; token: string }> => {
    try {
      const user = await this.authRepository.loginUser(loginUserDto);

      const token = Jwt.sign({ id: user.id });

      return {
        user,
        token,
      };
    } catch (error: any) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  findUser = async (id: string): Promise<UserEntity> => {
    return await this.authRepository.findUser(id);
  };
}
