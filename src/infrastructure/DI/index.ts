import {
  AuthController,
  AuthMiddleware,
  CategoryController,
  ProductController,
  RoleMiddleware,
  StoreController,
  StoreMiddleware,
} from "../../presentation";
import {
  AuthDatasource,
  CategoryDatasource,
  ProductDatasource,
  StoreDatasource,
} from "../datasources";
import {
  AuthRepository,
  CategoryRepository,
  ProductRepository,
  StoreRepository,
} from "../repositories";
import {
  AuthService,
  CategoryService,
  ProductService,
  StoreService,
} from "../services";

export const configureDependencies = () => {
  const authDatasource = new AuthDatasource();
  const authRepository = new AuthRepository(authDatasource);
  const authService = new AuthService(authRepository);
  const authController = new AuthController(authService);

  const storeDatasource = new StoreDatasource();
  const storeRepository = new StoreRepository(storeDatasource);
  const storeService = new StoreService(storeRepository);
  const storeController = new StoreController(storeService);

  const categoryDatasource = new CategoryDatasource();
  const categoryRepository = new CategoryRepository(categoryDatasource);
  const categoryService = new CategoryService(categoryRepository);
  const categoryController = new CategoryController(categoryService);

  const productDatasource = new ProductDatasource();
  const productRepository = new ProductRepository(productDatasource);
  const productService = new ProductService(
    productRepository,
    categoryService,
    storeService
  );
  const productController = new ProductController(productService);

  const authMiddleware = new AuthMiddleware(authService);
  const storeMiddleware = new StoreMiddleware(storeService);
  const roleMiddleware = new RoleMiddleware();

  return {
    authController,
    authMiddleware,
    categoryController,
    productController,
    roleMiddleware,
    storeController,
    storeMiddleware,
  };
};
