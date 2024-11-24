import {
  CreateProductDto,
  CustomError,
  IProductRepository,
  ProductEntity,
  UpdateProductDto,
} from "../../domain";

export class ProductService {
  constructor(public readonly productRepository: IProductRepository) {}

  create = async (
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> => {
    try {
      const product = await this.productRepository.create(createProductDto);

      return product;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  get = async (id: string): Promise<ProductEntity> => {
    try {
      const product = await this.productRepository.get(id);

      return product;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getAll = async (): Promise<ProductEntity[]> => {
    try {
      const products = await this.productRepository.getAll();

      return products;
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
      const product = await this.productRepository.update(id, updateProductDto);

      return product;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
