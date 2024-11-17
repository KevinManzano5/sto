import { Router } from "express";

import { AuthController } from "./controller";
import { AuthService } from "../../infrastructure/services/auth.service";
import { AuthRepository } from "../../infrastructure/repositories/auth.repository";
import { AuthDatasource } from "../../infrastructure/datasources/postgres.auth.datasource";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const postgresAuthDatasource = new AuthDatasource();
    const authRepository = new AuthRepository(postgresAuthDatasource);
    const authService = new AuthService(authRepository);
    const authController = new AuthController(authService);

    router.post("/create", authController.createUser);
    router.post("/login", authController.login);

    return router;
  }
}
