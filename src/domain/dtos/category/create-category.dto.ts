export class CreateCategoryDto {
  private constructor(public readonly name: string) {}

  static create({
    name,
  }: {
    [key: string]: any;
  }): [string?, CreateCategoryDto?] {
    if (!name) return ["Name is required", undefined];

    return [undefined, new CreateCategoryDto(name)];
  }
}
