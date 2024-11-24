export class CreateStoreDto {
  private constructor(
    public readonly name: string,
    public readonly userId: string
  ) {}

  static create({
    name,
    userId,
  }: {
    [key: string]: any;
  }): [string?, CreateStoreDto?] {
    if (!name) return ["name is required", undefined];
    if (!userId) return ["userId is required", undefined];

    return [undefined, new CreateStoreDto(name, userId)];
  }
}
