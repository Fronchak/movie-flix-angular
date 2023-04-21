import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import TokenContentType from 'src/types/token-content-type';
import { StorageService } from './storage.service';
import RoleType from 'src/types/role-type';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private storateService: StorageService) { }

  getTokenData(): TokenContentType | undefined {
    try {
      const token = this.storateService.getAuthData();
      const decoded = jwtDecode(token.token) as TokenContentType;
      console.log('decoded', decoded);
      return decoded;
    }
    catch(e) {
      return undefined;
    }
  }

  isAuthenticated(): boolean {
    const tokenData = this.getTokenData();
    const isAuth = tokenData !== undefined && (tokenData.exp > (Date.now() / 1000));
    return isAuth;
  }

  hasAnyRole(...roles: Array<RoleType>): boolean {
    const tokenData = this.getTokenData();
    if(!tokenData) return false;
    const userRoles = tokenData.roles;
    return roles.find((role) => userRoles.includes(role)) ? true : false;
  }

  isWorkerOrAdmin(): boolean {
    return this.hasAnyRole('ROLE_WORKER', 'ROLE_ADMIN');
  }

  isAdmin(): boolean {
    return this.hasAnyRole('ROLE_ADMIN');
  }
}
