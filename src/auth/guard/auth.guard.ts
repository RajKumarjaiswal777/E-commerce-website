import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request,request.params,"We got data",JSON.stringify(request.user));
    console.log(request.user.email)
    if(request.user.id === 3) {
        return true
    }
    return false;
  }
}