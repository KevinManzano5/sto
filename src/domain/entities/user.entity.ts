export class UserEntity {
  constructor(
    public id: string,
    public firstName: string,
    public email: string,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public lastName?: string
  ) {}

  public static fromObject = (object: { [key: string]: any }) => {
    const { id, firstName, email, isActive, createdAt, updatedAt, lastName } =
      object;

    if (!id) throw "Id is required";
    if (!firstName) throw "First name is required";
    if (!email) throw "Last name is required";
    if (!isActive) throw "Last name is required";

    return new UserEntity(
      id,
      firstName,
      email,
      isActive,
      createdAt,
      updatedAt,
      lastName
    );
  };
}
