import { ProductModel } from "../../database";
import { CreateProductDto, PaginationDto, UpdateProductDto } from "../dtos";

export interface IProductDatasource {
  create: (createProductDto: CreateProductDto) => Promise<ProductModel>;
  getAll: (paginationDto: PaginationDto) => Promise<ProductModel[]>;
  get: (id: string) => Promise<ProductModel>;
  update: (
    id: string,
    updateProductDto: UpdateProductDto
  ) => Promise<ProductModel>;
  delete: (id: string) => void;
}
