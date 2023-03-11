import { HttpJwtAuthGuard } from '@application/api/auth/guard/JwtAuthGuard';
import { applyDecorators, UseGuards } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HttpAuth = (): ((...args: any) => void) => {
  return applyDecorators(UseGuards(HttpJwtAuthGuard));
};
