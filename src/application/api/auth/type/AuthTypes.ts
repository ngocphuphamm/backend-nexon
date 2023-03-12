import { Request } from 'express';

export type UserPayload = {
  id: string;
  email: string;
};

export type RequestWithUser = Request & { user: UserPayload };

export type JwtPayload = {
  id: string;
  email: string;
};

export type LoggedInUser = {
  id: string;
  accessToken: string;
  refreshToken: string;
};
