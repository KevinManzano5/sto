export class StoreEntity {
  constructor(
    public id: string,
    public name: string,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public userId: string
  ) {}

  public static fromObject = (object: { [key: string]: any }): StoreEntity => {
    const { id, name, isActive, createdAt, updatedAt, userId } = object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (isActive === undefined) throw "isActive is required";
    if (!userId) throw "userId is required";

    return new StoreEntity(id, name, isActive, createdAt, updatedAt, userId);
  };
}
