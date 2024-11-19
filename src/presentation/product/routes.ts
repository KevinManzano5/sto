import { Router } from "express";
import { ProductController } from "./controller";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const productController = new ProductController();

    router.post("/create", productController.create);
    router.get("/", productController.getAll);
    router.get("/:id", productController.get);
    router.put("/:id", productController.update);
    router.delete("/:id", productController.delete);

    return router;
  }
}
