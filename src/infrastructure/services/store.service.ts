import {
  CreateStoreDto,
  CustomError,
  IStoreRepository,
  StoreEntity,
  UpdateStoreDto,
} from "../../domain";

export class StoreService {
  constructor(public readonly storeRepository: IStoreRepository) {}

  create = async (createStoreDto: CreateStoreDto): Promise<StoreEntity> => {
    try {
      const store = await this.storeRepository.create(createStoreDto);

      return store;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  get = async (id: string): Promise<StoreEntity> => {
    try {
      const store = await this.storeRepository.get(id);

      return store;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getAll = async (): Promise<StoreEntity[]> => {
    try {
      const stores = await this.storeRepository.getAll();

      return stores;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getStoreByUserId = async (userId: string): Promise<StoreEntity> => {
    try {
      const store = await this.storeRepository.getStoreByUserId(userId);

      return store;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  update = async (
    id: string,
    updateStoreDto: UpdateStoreDto
  ): Promise<StoreEntity> => {
    try {
      const store = await this.storeRepository.update(id, updateStoreDto);

      return store;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      return await this.storeRepository.delete(id);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
