export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create({
    email,
    password,
  }: {
    [key: string]: any;
  }): [string?, LoginUserDto?] {
    if (!email) return ["Email is required", undefined];
    if (!password) return ["Password is required", undefined];

    return [undefined, new LoginUserDto(email, password)];
  }
}
