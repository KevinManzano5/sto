import { Router } from "express";

import { configureDependencies } from "../../infrastructure";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const { authMiddleware, productController, storeMiddleware } =
      configureDependencies();

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
