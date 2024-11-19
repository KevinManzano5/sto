import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { CategoryEntity } from "../entities";

export interface ICategoryRepository {
  create: (createCategoryDto: CreateCategoryDto) => Promise<CategoryEntity>;
  getAll: () => Promise<CategoryEntity[]>;
  get: (id: string) => Promise<CategoryEntity>;
  update: (
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ) => Promise<CategoryEntity>;
  delete: (id: string) => Promise<void>;
}
