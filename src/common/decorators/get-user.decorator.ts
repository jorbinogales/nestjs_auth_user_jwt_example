import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  const user = data === 'email' ? req.user.email : req.user;

  if (!user) {
    throw new InternalServerErrorException('User not found in request');
  }

  return user;
});
