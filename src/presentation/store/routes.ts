import { Router } from "express";

import { StoreController } from "./controller";
import {
  AuthDatasource,
  AuthRepository,
  AuthService,
  StoreDatasource,
  StoreRepository,
  StoreService,
} from "../../infrastructure";
import { AuthMiddleware, RoleMiddleware } from "../middleware";

export class StoreRoutes {
  static get routes(): Router {
    const router = Router();

    const authDatasource = new AuthDatasource();
    const authRepository = new AuthRepository(authDatasource);
    const authService = new AuthService(authRepository);

    const authMiddleware = new AuthMiddleware(authService);
    const roleMiddleware = new RoleMiddleware();

    const storeDatasource = new StoreDatasource();
    const storeRepository = new StoreRepository(storeDatasource);
    const storeService = new StoreService(storeRepository);
    const storeController = new StoreController(storeService);

    router.post(
      "/create",
      [authMiddleware.validateToken],
      storeController.create
    );
    router.get("/", [authMiddleware.validateToken], storeController.getAll);
    router.get(
      "/:id",
      [authMiddleware.validateToken, roleMiddleware.validateAdmin],
      storeController.get
    );
    router.put("/:id", [authMiddleware.validateToken], storeController.update);
    router.delete(
      "/:id",
      [authMiddleware.validateToken],
      storeController.delete
    );

    return router;
  }
}
