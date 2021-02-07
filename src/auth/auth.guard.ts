import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '../jwt/jwt.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    return this.validateRequest(gqlContext);
  }

  private async validateRequest(gqlContext: any): Promise<boolean> {
    const token = gqlContext.token;
    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { user } = await this.usersService.findById(decoded['id']);
        if (user) {
          gqlContext['user'] = user;
          return true;
        }
      }
    }
    return false;
  }
}
