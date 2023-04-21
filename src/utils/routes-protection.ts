import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";


export const myGuard: CanActivateFn = (next: ActivatedRouteSnapshot,  state: RouterStateSnapshot) => {

  return false;
}
