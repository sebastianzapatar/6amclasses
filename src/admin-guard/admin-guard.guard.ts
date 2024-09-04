import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles = ['admin'];
    const req= context.switchToHttp().getRequest();
    console.log(req);
    const user = req.user;
    for(const role of user.roles){
      if(validRoles.includes(role)){
        return true;
      }
    }
    throw new UnauthorizedException('Forbiden for your rol Mateo nulls');
  }
}
