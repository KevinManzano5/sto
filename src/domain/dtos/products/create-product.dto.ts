export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly userId: string
  ) {}

  static create({
    name,
    userId,
  }: {
    [key: string]: any;
  }): [string?, CreateProductDto?] {
    if (!name) return ["name is required", undefined];
    if (!userId) return ["userId is required", undefined];

    return [undefined, new CreateProductDto(name, userId)];
  }
}
