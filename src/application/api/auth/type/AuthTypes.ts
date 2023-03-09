import { Request } from 'express';

export type UserPayload = {
  id: string;
  email: string;
  username: string;
};

export type HttpRequestWithUser = Request & { user: UserPayload };

export type JwtPayload = {
  id: string;
};

export type LoggedInUser = {
  id: string;
  accessToken: string;
};
