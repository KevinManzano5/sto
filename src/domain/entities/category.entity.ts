export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  public static fromObject = (object: {
    [key: string]: any;
  }): CategoryEntity => {
    const { id, name, isActive, createdAt, updatedAt } = object;

    if (!id) throw "Id is required";
    if (!name) throw "Name is required";
    if (isActive === undefined) throw "isActive is required";

    return new CategoryEntity(id, name, isActive, createdAt, updatedAt);
  };
}
