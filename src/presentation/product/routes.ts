import { Router } from "express";

import { ProductController } from "./controller";
import {
  AuthDatasource,
  AuthRepository,
  AuthService,
  ProductDatasource,
  ProductRepository,
  ProductService,
} from "../../infrastructure";
import { AuthMiddleware } from "../middleware";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const authDatasource = new AuthDatasource();
    const authRepository = new AuthRepository(authDatasource);
    const authService = new AuthService(authRepository);
    const authMiddleware = new AuthMiddleware(authService);

    const productDatasource = new ProductDatasource();
    const productRepository = new ProductRepository(productDatasource);
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    router.post(
      "/create",
      [authMiddleware.validateToken],
      productController.create
    );
    router.get("/", productController.getAll);
    router.get("/:id", productController.get);
    router.put("/:id", productController.update);
    router.delete("/:id", productController.delete);

    return router;
  }
}
