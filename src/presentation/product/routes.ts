import { Router } from "express";

import { ProductController } from "./controller";
import {
  AuthDatasource,
  AuthRepository,
  AuthService,
  ProductDatasource,
  ProductRepository,
  ProductService,
  StoreDatasource,
  StoreRepository,
  StoreService,
} from "../../infrastructure";
import { AuthMiddleware, StoreMiddleware } from "../middleware";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const authDatasource = new AuthDatasource();
    const authRepository = new AuthRepository(authDatasource);
    const authService = new AuthService(authRepository);

    const storeDatasource = new StoreDatasource();
    const storeRepository = new StoreRepository(storeDatasource);
    const storeService = new StoreService(storeRepository);

    const authMiddleware = new AuthMiddleware(authService);
    const storeMiddleware = new StoreMiddleware(storeService);

    const productDatasource = new ProductDatasource();
    const productRepository = new ProductRepository(productDatasource);
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    router.post(
      "/create",
      [authMiddleware.validateToken, storeMiddleware.getStore],
      productController.create
    );
    router.get("/", productController.getAll);
    router.get("/:id", productController.get);
    router.put(
      "/:id",
      [authMiddleware.validateToken, storeMiddleware.getStore],
      productController.update
    );
    router.delete(
      "/:id",
      [authMiddleware.validateToken, storeMiddleware.getStore],
      productController.delete
    );

    return router;
  }
}
