import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, 'your-secret-key') as { isAdmin: boolean };

      if (!decoded.isAdmin) {
        throw new ForbiddenException('Admin access required');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
