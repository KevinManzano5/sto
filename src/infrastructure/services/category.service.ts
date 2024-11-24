import {
  CategoryEntity,
  CreateCategoryDto,
  CustomError,
  ICategoryRepository,
  UpdateCategoryDto,
} from "../../domain";

export class CategoryService {
  constructor(public readonly categoryRepository: ICategoryRepository) {}

  create = async (
    createCategoryDto: CreateCategoryDto
  ): Promise<CategoryEntity> => {
    try {
      const category = await this.categoryRepository.create(createCategoryDto);

      return category;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getAll = async (): Promise<CategoryEntity[]> => {
    try {
      return await this.categoryRepository.getAll();
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  get = async (id: string): Promise<CategoryEntity> => {
    try {
      return await this.categoryRepository.get(id);
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
      return await this.categoryRepository.update(id, updateCategoryDto);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      await this.get(id);

      return await this.categoryRepository.delete(id);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
