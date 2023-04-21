import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { GuardService } from "src/app/guard.service";
import RoleType from "src/types/role-type";

export const authenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot
) => {
  return inject(GuardService).isAuthenticated(state);
}

export const rolesGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot
) => {
  const roles: Array<RoleType> = route.data['roles'];
  return inject(GuardService).hasAnyRole(...roles);
}
