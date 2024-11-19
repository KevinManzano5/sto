import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { CategoryModel } from "../../database";

export interface ICategoryDatasource {
  create: (createCategoryDto: CreateCategoryDto) => Promise<CategoryModel>;
  getAll: () => Promise<CategoryModel[]>;
  get: (id: string) => Promise<CategoryModel>;
  update: (
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ) => Promise<CategoryModel>;
  delete: (id: string) => Promise<void>;
}
