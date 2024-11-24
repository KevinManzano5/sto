import { Request, Response } from "express";
import { validate } from "uuid";

import { ProductService, StoreService } from "../../infrastructure";
import {
  CreateProductDto,
  CreateStoreDto,
  UpdateProductDto,
  UpdateStoreDto,
} from "../../domain";

export class StoreController {
  constructor(public readonly storeService: StoreService) {}

  private handleError = (error: any, res: Response) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";

    return res.status(statusCode).json({ message });
  };

  public create = async (req: Request, res: Response) => {
    try {
      const [error, createStoreDto] = CreateStoreDto.create({
        ...req.body,
      });

      if (error) return res.status(400).json({ error });

      const store = await this.storeService.create(createStoreDto!);

      return res.status(201).json(store);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const stores = await this.storeService.getAll();

      return res.status(200).json(stores);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public get = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!validate(id))
      return res.status(400).json({ message: `Id ${id} is not valid UUID` });

    try {
      const store = await this.storeService.get(id);

      return res.status(200).json(store);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public update = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!validate(id))
      return res.status(400).json({ message: `Id ${id} is not valid UUID` });

    try {
      const [error, updateStoreDto] = UpdateStoreDto.create(req.body);

      if (error) return res.status(400).json({ error });

      const updatedStore = await this.storeService.update(id, updateStoreDto!);

      return res.status(200).json({ category: { ...updatedStore } });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!validate(id))
      return res.status(400).json({ message: `Id ${id} is not valid UUID` });

    try {
      await this.storeService.delete(id);

      return res.sendStatus(204);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
