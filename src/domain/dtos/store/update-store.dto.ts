export class UpdateStoreDto {
  private constructor(public readonly name?: string) {}

  static create({ name }: { [key: string]: any }): [string?, UpdateStoreDto?] {
    if (name) return [undefined, new UpdateStoreDto(name)];

    return ["No data provided", undefined];
  }
}
