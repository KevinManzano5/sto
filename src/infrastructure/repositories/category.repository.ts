import {
  CreateCategoryDto,
  CategoryEntity,
  UpdateCategoryDto,
  CustomError,
} from "../../domain";
import { ICategoryRepository } from "../../domain/repositories/ICategory.repository";
import { CategoryDatasource } from "../datasources";

export class CategoryRepository implements ICategoryRepository {
  constructor(public readonly categoryDatasource: CategoryDatasource) {}

  create = async (
    createCategoryDto: CreateCategoryDto
  ): Promise<CategoryEntity> => {
    try {
      const category = await this.categoryDatasource.create(createCategoryDto);

      return CategoryEntity.fromObject(category);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getAll = async (): Promise<CategoryEntity[]> => {
    try {
      const categories = await this.categoryDatasource.getAll();

      return categories.map((category) => CategoryEntity.fromObject(category));
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  get = async (id: string): Promise<CategoryEntity> => {
    try {
      const category = await this.categoryDatasource.get(id);

      return CategoryEntity.fromObject(category);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  update = async (
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryEntity> => {
    try {
      await this.get(id);

      const updatedCategory = await this.categoryDatasource.update(
        id,
        updateCategoryDto
      );

      return CategoryEntity.fromObject(updatedCategory);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      await this.get(id);

      await this.categoryDatasource.delete(id);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
