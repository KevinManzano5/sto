import { prisma, ProductModel } from "../../database/postgres";
import {
  CreateProductDto,
  CustomError,
  IProductDatasource,
  PaginationDto,
  UpdateProductDto,
} from "../../domain";

export class ProductDatasource implements IProductDatasource {
  create = async (
    createProductDto: CreateProductDto
  ): Promise<ProductModel> => {
    try {
      const product = await prisma.product.create({
        data: createProductDto,
      });

      return product;
    } catch (error: any) {
      if (error.code === "P2002")
        throw CustomError.badRequest(`${error.meta.target[0]} already exist`);

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getAll = async ({ limit, page }: PaginationDto): Promise<ProductModel[]> => {
    try {
      const products: ProductModel[] = await prisma.product.findMany({
        where: { isActive: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return products;
    } catch (error) {
      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  get = async (id: string): Promise<ProductModel> => {
    try {
      const product = await prisma.product.findFirst({ where: { id } });

      if (!product || !product.isActive)
        throw CustomError.notFound(`Product with id ${id} not found`);

      return product;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  update = async (
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<ProductModel> => {
    try {
      await this.get(id);

      const updatedProduct = await prisma.product.update({
        where: { id },
        data: updateProductDto,
      });

      return updatedProduct;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      await this.get(id);

      await prisma.product.update({
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
