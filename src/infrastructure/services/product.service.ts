import {
  CreateProductDto,
  CustomError,
  IProductRepository,
  PaginationDto,
  ProductEntity,
  UpdateProductDto,
} from "../../domain";
import { CategoryService } from "./category.service";
import { StoreService } from "./store.service";

export class ProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryService: CategoryService,
    private readonly storeService: StoreService
  ) {}

  private handleError = (error: any): never => {
    if (error instanceof CustomError) throw error;

    console.error(JSON.stringify(error));

    throw CustomError.internalServer("Internal server error");
  };

  private mapProduct = (
    product: ProductEntity,
    categoryName: string,
    storeName: string
  ) => {
    return {
      id: product.id,
      name: product.name,
      isActive: product.isActive,
      category: categoryName,
      store: storeName,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };

  create = async (createProductDto: CreateProductDto) => {
    try {
      const product = await this.productRepository.create(createProductDto);

      const [category, store] = await Promise.all([
        this.categoryService.get(product.categoryId),
        this.storeService.get(product.storeId),
      ]);

      return this.mapProduct(product, category.name, store.name);
    } catch (error: any) {
      return this.handleError(error);
    }
  };

  get = async (id: string) => {
    try {
      const product = await this.productRepository.get(id);

      const [category, store] = await Promise.all([
        this.categoryService.get(product.categoryId),
        this.storeService.get(product.storeId),
      ]);

      return this.mapProduct(product, category.name, store.name);
    } catch (error: any) {
      this.handleError(error);
    }
  };

  getAll = async (paginationDto: PaginationDto) => {
    try {
      const products = await this.productRepository.getAll(paginationDto);

      const mappedProducts = await Promise.all(
        products.map(async (product) => {
          const [category, store] = await Promise.all([
            this.categoryService.get(product.categoryId),
            this.storeService.get(product.storeId),
          ]);

          return this.mapProduct(product, category.name, store.name);
        })
      );

      return mappedProducts;
    } catch (error: any) {
      this.handleError(error);
    }
  };

  update = async (id: string, updateProductDto: UpdateProductDto) => {
    try {
      const product = await this.productRepository.update(id, updateProductDto);

      return await this.get(product.id);
    } catch (error: any) {
      return this.handleError(error);
    }
  };

  delete = async (id: string) => {
    try {
      return await this.productRepository.delete(id);
    } catch (error: any) {
      this.handleError(error);
    }
  };
}
