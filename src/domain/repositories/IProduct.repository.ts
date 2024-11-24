import { CreateProductDto, UpdateProductDto } from "../dtos";
import { ProductEntity } from "../entities";

export interface IProductRepository {
  create: (createProductDto: CreateProductDto) => Promise<ProductEntity>;
  getAll: () => Promise<ProductEntity[]>;
  get: (id: string) => Promise<ProductEntity>;
  update: (
    id: string,
    updateProductDto: UpdateProductDto
  ) => Promise<ProductEntity>;
  delete: (id: string) => Promise<void>;
}
