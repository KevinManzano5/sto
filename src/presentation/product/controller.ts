import { Request, Response } from "express";
import { validate } from "uuid";

import { ProductService } from "../../infrastructure";
import { CreateProductDto, UpdateProductDto } from "../../domain";

export class ProductController {
  constructor(public readonly productService: ProductService) {}

  private handleError = (error: any, res: Response) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";

    return res.status(statusCode).json({ message });
  };

  public create = async (req: Request, res: Response) => {
    try {
      const [error, createProductDto] = CreateProductDto.create({
        ...req.body,
      });

      if (error) return res.status(400).json({ error });

      const product = await this.productService.create(createProductDto!);

      return res.status(201).json(product);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const categories = await this.productService.getAll();

      return res.status(200).json(categories);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public get = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!validate(id))
      return res.status(400).json({ message: `Id ${id} is not valid UUID` });

    try {
      const category = await this.productService.get(id);

      return res.status(200).json(category);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public update = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!validate(id))
      return res.status(400).json({ message: `Id ${id} is not valid UUID` });

    try {
      const [error, updateProductDto] = UpdateProductDto.create(req.body);

      if (error) return res.status(400).json({ error });

      const updatedCategory = await this.productService.update(
        id,
        updateProductDto!
      );

      return res.status(200).json({ category: { ...updatedCategory } });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!validate(id))
      return res.status(400).json({ message: `Id ${id} is not valid UUID` });

    try {
      await this.productService.delete(id);

      return res.sendStatus(204);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
