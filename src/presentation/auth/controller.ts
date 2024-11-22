import { Request, Response } from "express";

import { AuthService } from "../../infrastructure";
import { CreateUserDto, LoginUserDto } from "../../domain";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private handleError = (error: any, res: Response) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";

    return res.status(statusCode).json({ message });
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const [error, createUserDto] = CreateUserDto.create(req.body);

      if (error) return res.status(400).json({ error });

      const user = await this.authService.createUser(createUserDto!);

      return res.status(201).json(user);
    } catch (error: any) {
      this.handleError(error, res);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const [error, loginUserDto] = LoginUserDto.create(req.body);

      if (error) return res.status(400).json({ error });

      const user = await this.authService.loginUser(loginUserDto!);

      return res.status(200).json(user);
    } catch (error: any) {
      this.handleError(error, res);
    }
  };

  public profile = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.findUser(req.body.userId);

      return res.status(200).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
