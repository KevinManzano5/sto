export class PaginationDto {
  private constructor(
    public readonly limit: number,
    public readonly page: number
  ) {}

  static create(limit = 10, page = 1): [string?, PaginationDto?] {
    if (isNaN(page) || isNaN(limit))
      return ["Page and limit must be numbers", undefined];

    if (page <= 0) return ["Page must be greater than 0", undefined];
    if (limit <= 0) return ["Limit must be greater than 0", undefined];

    return [undefined, new PaginationDto(limit, page)];
  }
}
