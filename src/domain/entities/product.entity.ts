export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public isActive: boolean,
    public categoryId: string,
    public storeId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  public static fromObject = (object: {
    [key: string]: any;
  }): ProductEntity => {
    const { id, name, isActive, categoryId, storeId, createdAt, updatedAt } =
      object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (isActive === undefined) throw "isActive is required";
    if (!categoryId) throw "categoryId is required";
    if (!storeId) throw "storeId is required";

    return new ProductEntity(
      id,
      name,
      isActive,
      categoryId,
      storeId,
      createdAt,
      updatedAt
    );
  };
}
