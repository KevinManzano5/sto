import { prisma } from "../../database/postgres";
import { UserModel } from "../../database/postgres/models/user.model";
import { CreateUserDto, LoginUserDto } from "../../domain";
import { IAuthDatasource } from "../../domain/datasources/IAuth.datasource";
import { CustomError } from "../../domain/errors/custom.error";
import { bcrypt } from "../adapters/bcrypt";

export class AuthDatasource implements IAuthDatasource {
  createUser = async (createUserDto: CreateUserDto): Promise<UserModel> => {
    try {
      const user = await prisma.user.create({ data: createUserDto });

      return user;
    } catch (error: any) {
      if (error.code === "P2002")
        throw CustomError.badRequest(`${error.meta.target[0]} already exist`);

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  loginUser = async (loginUserDto: LoginUserDto): Promise<UserModel> => {
    const { email, password } = loginUserDto;

    try {
      const user = await prisma.user.findFirst({ where: { email } });

      if (!user)
        throw CustomError.notFound(`User with email ${email} does not exist`);

      const isPasswordValid = bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        throw CustomError.notFound(`User or password is not valid`);

      return user;
    } catch (error: any) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}