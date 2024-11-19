export class UpdateCategoryDto {
  private constructor(public readonly name?: string) {}

  static create({
    name,
  }: {
    [key: string]: any;
  }): [string?, UpdateCategoryDto?] {
    if (name) return [undefined, new UpdateCategoryDto(name)];

    return ["No data provided", undefined];
  }
}
