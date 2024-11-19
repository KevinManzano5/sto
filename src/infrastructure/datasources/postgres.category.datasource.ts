import { CategoryModel, prisma } from "../../database/postgres";
import {
  CreateCategoryDto,
  CustomError,
  ICategoryDatasource,
  UpdateCategoryDto,
} from "../../domain";

export class CategoryDatasource implements ICategoryDatasource {
  create = async (
    createCategoryDto: CreateCategoryDto
  ): Promise<CategoryModel> => {
    try {
      const category = await prisma.category.create({
        data: createCategoryDto,
      });

      return category;
    } catch (error: any) {
      if (error.code === "P2002")
        throw CustomError.badRequest(`${error.meta.target[0]} already exist`);

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getAll = async (): Promise<CategoryModel[]> => {
    try {
      const categories = (await prisma.category.findMany()).filter(
        (category) => category.isActive === true
      );

      return categories;
    } catch (error) {
      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  get = async (id: string): Promise<CategoryModel> => {
    try {
      const category = await prisma.category.findFirst({ where: { id } });

      if (!category || !category.isActive)
        throw CustomError.notFound(`Category with id ${id} not found`);

      return category;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  update = async (
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryModel> => {
    try {
      await this.get(id);

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });

      return updatedCategory;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      await this.get(id);

      await prisma.category.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
