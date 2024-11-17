import { CreateUserDto, LoginUserDto, UserEntity } from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";
import { bcrypt } from "../adapters/bcrypt";
import { AuthRepository } from "../repositories/auth.repository";

export class AuthService {
  constructor(public readonly authRepository: AuthRepository) {}

  createUser = async (createUserDto: CreateUserDto): Promise<UserEntity> => {
    createUserDto.password = bcrypt.hash(createUserDto.password);

    try {
      return await this.authRepository.createUser(createUserDto);
    } catch (error: any) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  loginUser = async (loginUserDto: LoginUserDto): Promise<UserEntity> => {
    try {
      return await this.authRepository.loginUser(loginUserDto);
    } catch (error: any) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
