export class UpdateProductDto {
  private constructor(public readonly name?: string) {}

  static create({
    name,
  }: {
    [key: string]: any;
  }): [string?, UpdateProductDto?] {
    if (name) return [undefined, new UpdateProductDto(name)];

    return ["No data provided", undefined];
  }
}
