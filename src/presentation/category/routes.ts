import { Router } from "express";

import { CategoryController } from "./controller";
import {
  AuthDatasource,
  AuthRepository,
  AuthService,
  CategoryDatasource,
  CategoryRepository,
  CategoryService,
} from "../../infrastructure";
import { AuthMiddleware } from "../middleware";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const authDatasource = new AuthDatasource();
    const authRepository = new AuthRepository(authDatasource);
    const authService = new AuthService(authRepository);
    const authMiddleware = new AuthMiddleware(authService);

    const categoryDatasource = new CategoryDatasource();
    const categoryRepository = new CategoryRepository(categoryDatasource);
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService);

    router.post(
      "/create",
      [authMiddleware.validateToken],
      categoryController.create
    );
    router.get("/", categoryController.getAll);
    router.get("/:id", categoryController.get);
    router.put("/:id", categoryController.update);
    router.delete("/:id", categoryController.delete);

    return router;
  }
}
