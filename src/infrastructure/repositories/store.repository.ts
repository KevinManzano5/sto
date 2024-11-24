import {
  CreateStoreDto,
  CustomError,
  IStoreDatasource,
  IStoreRepository,
  StoreEntity,
  UpdateStoreDto,
} from "../../domain";

export class StoreRepository implements IStoreRepository {
  constructor(public readonly storeDatasource: IStoreDatasource) {}

  create = async (createStoreDto: CreateStoreDto): Promise<StoreEntity> => {
    try {
      const store = await this.storeDatasource.create(createStoreDto);

      return StoreEntity.fromObject(store);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getAll = async (): Promise<StoreEntity[]> => {
    try {
      const stores = await this.storeDatasource.getAll();

      return stores.map((store) => StoreEntity.fromObject(store));
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  get = async (id: string): Promise<StoreEntity> => {
    try {
      const store = await this.storeDatasource.get(id);

      return StoreEntity.fromObject(store);
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
      await this.get(id);

      const updatedStore = await this.storeDatasource.update(
        id,
        updateStoreDto
      );

      return StoreEntity.fromObject(updatedStore);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      await this.get(id);

      await this.storeDatasource.delete(id);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
