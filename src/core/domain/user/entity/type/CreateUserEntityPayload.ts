
export type CreateUserEntityPayload = {
  username: string,
  email: string,
  password: string
  id?: string,
  createdAt?: Date,
  updatedAt?: Date | null,
};
