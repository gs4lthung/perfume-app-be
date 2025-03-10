import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      if (!request['isAdmin']) throw new ForbiddenException();
    } catch {
      throw new ForbiddenException();
    }
    return true;
  }
}
