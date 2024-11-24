import { prisma, StoreModel } from "../../database/postgres";
import {
  CreateStoreDto,
  CustomError,
  IStoreDatasource,
  UpdateStoreDto,
} from "../../domain";

export class StoreDatasource implements IStoreDatasource {
  create = async (createStoreDto: CreateStoreDto): Promise<StoreModel> => {
    try {
      const store = await prisma.store.create({
        data: createStoreDto,
      });

      return store;
    } catch (error: any) {
      if (error.meta.target[0] === "userId")
        throw CustomError.badRequest(
          `User ${createStoreDto.userId} already has an associated store`
        );

      if (error.code === "P2002")
        throw CustomError.badRequest(`${error.meta.target[0]} already exist`);

      console.error(JSON.stringify(error));

      throw CustomError.internalServer("Internal server error");
    }
  };

  getAll = async (): Promise<StoreModel[]> => {
    try {
      const stores = (await prisma.store.findMany()).filter(
        (store) => store.isActive === true
      );

      return stores;
    } catch (error) {
      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  get = async (id: string): Promise<StoreModel> => {
    try {
      const store = await prisma.store.findFirst({ where: { id } });

      if (!store || !store.isActive)
        throw CustomError.notFound(`Store with id ${id} not found`);

      return store;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  getStoreByUserId = async (userId: string): Promise<StoreModel> => {
    try {
      const store = await prisma.store.findFirst({ where: { userId } });

      if (!store || !store.isActive)
        throw CustomError.notFound(`Store with userId ${userId} not found`);

      return store;
    } catch (error: any) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  update = async (
    id: string,
    updateStoreDto: UpdateStoreDto
  ): Promise<StoreModel> => {
    try {
      await this.get(id);

      const updatedStore = await prisma.store.update({
        where: { id },
        data: updateStoreDto,
      });

      return updatedStore;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      await this.get(id);

      await prisma.store.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error(error);

      throw CustomError.internalServer("Internal server error");
    }
  };
}
