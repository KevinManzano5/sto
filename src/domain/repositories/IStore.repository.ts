import { CreateStoreDto, UpdateStoreDto } from "../dtos";
import { StoreEntity } from "../entities";

export interface IStoreRepository {
  create: (createStoreDto: CreateStoreDto) => Promise<StoreEntity>;
  getAll: () => Promise<StoreEntity[]>;
  get: (id: string) => Promise<StoreEntity>;
  getStoreByUserId: (userId: string) => Promise<StoreEntity>;
  update: (id: string, updateStoreDto: UpdateStoreDto) => Promise<StoreEntity>;
  delete: (id: string) => Promise<void>;
}
