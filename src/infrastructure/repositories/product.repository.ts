import {
  CreateProductDto,
  CustomError,
  IProductDatasource,
  IProductRepository,
  PaginationDto,
  ProductEntity,
  UpdateProductDto,
} from "../../domain";

export class ProductRepository implements IProductRepository {
  constructor(public readonly productDatasource: IProductDatasource) {}

  create = async (
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> => {
    try {
      const product = await this.productDatasource.create(createProductDto);

      return ProductEntity.fromObject(product);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getAll = async (paginationDto: PaginationDto): Promise<ProductEntity[]> => {
    try {
      const products = await this.productDatasource.getAll(paginationDto);

      return products.map((product) => ProductEntity.fromObject(product));
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  get = async (id: string): Promise<ProductEntity> => {
    try {
      const product = await this.productDatasource.get(id);

      return ProductEntity.fromObject(product);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  update = async (
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> => {
    try {
      await this.get(id);

      const updatedProduct = await this.productDatasource.update(
        id,
        updateProductDto
      );

      return ProductEntity.fromObject(updatedProduct);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      await this.get(id);

      await this.productDatasource.delete(id);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
