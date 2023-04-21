import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterStateSnapshot } from '@angular/router';
import RoleType from 'src/types/role-type';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private tokenService: TokenService,
            private toastr: ToastrService,
            private router: Router) { }

  isAuthenticated(state: RouterStateSnapshot): boolean {
    const isAuth = this.tokenService.isAuthenticated();
    if(isAuth) return isAuth;
    this.toastr.error('You need to login to access this content');
    this.router.navigate(['/auth/login'], {
      queryParams: {
        redirectTo: state.url
      }
    });
    return false;
  }

  hasAnyRole(...roles: Array<RoleType>): boolean {
    const isAuth = this.tokenService.hasAnyRole(...roles);
    if(isAuth) return isAuth;
    this.toastr.error(`You don't have permission to access this content`);
    this.router.navigateByUrl('/movies');
    return false;
  }
}
