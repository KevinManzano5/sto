import { validate } from "uuid";

export class UpdateProductDto {
  private constructor(
    public readonly name?: string,
    public readonly categoryId?: string
  ) {}

  static create({
    name,
    categoryId,
  }: {
    [key: string]: any;
  }): [string?, UpdateProductDto?] {
    if (categoryId && !validate(categoryId))
      return ["categoryId is not valid", undefined];

    if (name || categoryId)
      return [undefined, new UpdateProductDto(name, categoryId)];

    return ["No data provided", undefined];
  }
}
