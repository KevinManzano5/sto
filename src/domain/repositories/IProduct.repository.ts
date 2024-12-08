import { CreateProductDto, PaginationDto, UpdateProductDto } from "../dtos";
import { ProductEntity } from "../entities";

export interface IProductRepository {
  create: (createProductDto: CreateProductDto) => Promise<ProductEntity>;
  getAll: (paginationDto: PaginationDto) => Promise<ProductEntity[]>;
  get: (id: string) => Promise<ProductEntity>;
  update: (
    id: string,
    updateProductDto: UpdateProductDto
  ) => Promise<ProductEntity>;
  delete: (id: string) => Promise<void>;
}
