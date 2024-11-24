import { NextFunction, Request, Response } from "express";

import { StoreService } from "../../infrastructure";
import { CustomError } from "../../domain";

export class StoreMiddleware {
  constructor(public readonly storeService: StoreService) {}

  getStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body.userId;

      if (!userId) return res.status(400).json({ error: "userId is required" });

      const store = await this.storeService.getStoreByUserId(userId);

      if (!store)
        return res
          .status(404)
          .json({ error: `Store with userId ${userId} not found` });

      req.body.storeId = store.id;

      next();
    } catch (error: any) {
      if (error instanceof CustomError)
        return res.status(error.statusCode).json({ error: error.message });

      console.error({ error: JSON.stringify(error) });

      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
