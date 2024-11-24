import { StoreModel } from "../../database";
import { CreateStoreDto, UpdateStoreDto } from "../dtos";

export interface IStoreDatasource {
  create: (createStoreDto: CreateStoreDto) => Promise<StoreModel>;
  getAll: () => Promise<StoreModel[]>;
  get: (id: string) => Promise<StoreModel>;
  getStoreByUserId: (userId: string) => Promise<StoreModel>;
  update: (id: string, updateStoreDto: UpdateStoreDto) => Promise<StoreModel>;
  delete: (id: string) => Promise<void>;
}
