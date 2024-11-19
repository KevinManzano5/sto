export class CreateUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly email: string,
    public password: string,
    public readonly lastName?: string
  ) {}

  static create({
    firstName,
    email,
    password,
    lastName,
  }: {
    [key: string]: any;
  }): [string?, CreateUserDto?] {
    if (!firstName) return ["First name is required", undefined];
    if (!email) return ["Email is required", undefined];
    if (!password) return ["Password is required", undefined];

    return [undefined, new CreateUserDto(firstName, email, password, lastName)];
  }
}
