import { Router } from "express";

import { CategoryController } from "./controller";
import {
  CategoryDatasource,
  CategoryRepository,
  CategoryService,
} from "../../infrastructure";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryDatasource = new CategoryDatasource();
    const categoryRepository = new CategoryRepository(categoryDatasource);
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService);

    router.post("/create", categoryController.create);
    router.get("/", categoryController.getAll);
    router.get("/:id", categoryController.get);
    router.put("/:id", categoryController.update);
    router.delete("/:id", categoryController.delete);

    return router;
  }
}
