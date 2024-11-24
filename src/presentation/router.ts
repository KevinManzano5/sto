import { Router } from "express";

import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./category/routes";
import { ProductRoutes } from "./product/routes";
import { StoreRoutes } from "./store/routes";

export class AppRouter {
  static get routes(): Router {
    const router = Router();

    router.use("/auth", AuthRoutes.routes);
    router.use("/store", StoreRoutes.routes);
    router.use("/category", CategoryRoutes.routes);
    router.use("/product", ProductRoutes.routes);

    return router;
  }
}
