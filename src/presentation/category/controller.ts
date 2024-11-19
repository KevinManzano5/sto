import { Request, Response } from "express";
import { validate } from "uuid";

import { CategoryService } from "../../infrastructure";
import { CreateCategoryDto, UpdateCategoryDto } from "../../domain";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: any, res: Response) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";

    return res.status(statusCode).json({ message });
  };

  public create = async (req: Request, res: Response) => {
    try {
      const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

      if (error) return res.status(400).json({ error });

      const category = await this.categoryService.create(createCategoryDto!);

      return res.status(201).json(category);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.getAll();

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
      const category = await this.categoryService.get(id);

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
      const [error, updateCategoryDto] = UpdateCategoryDto.create(req.body);

      if (error) return res.status(400).json({ error });

      const updatedCategory = await this.categoryService.update(
        id,
        updateCategoryDto!
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
      await this.categoryService.delete(id);

      return res.sendStatus(204);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
