import { Router } from "express";

import { AuthController } from "./controller";
import {
  AuthDatasource,
  AuthService,
  AuthRepository,
} from "../../infrastructure";
import { AuthMiddleware } from "../middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authDatasource = new AuthDatasource();
    const authRepository = new AuthRepository(authDatasource);
    const authService = new AuthService(authRepository);

    const authMiddleware = new AuthMiddleware(authService);
    const authController = new AuthController(authService);

    router.post("/create", authController.createUser);
    router.post("/login", authController.login);
    router.get(
      "/profile",
      [authMiddleware.validateToken],
      authController.profile
    );

    return router;
  }
}
