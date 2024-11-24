export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly categoryId: string,
    public readonly storeId: string
  ) {}

  static create({
    name,
    categoryId,
    storeId,
  }: {
    [key: string]: any;
  }): [string?, CreateProductDto?] {
    if (!name) return ["name is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];
    if (!storeId) return ["storeId is required", undefined];

    return [undefined, new CreateProductDto(name, categoryId, storeId)];
  }
}
