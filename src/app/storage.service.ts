import { Injectable } from '@angular/core';
import TokenResponseType from 'src/types/token-response-type';

const AUTH_DATA = 'authData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveAuthData(tokenResponse: TokenResponseType): void {
    localStorage.setItem(AUTH_DATA, JSON.stringify(tokenResponse));
  }

  getAuthData(): TokenResponseType {
    const rawToken = localStorage.getItem(AUTH_DATA);
    if(!rawToken) {
      throw new Error('Token not found');
    }
    return JSON.parse(rawToken) as TokenResponseType;
  }

  removeAuthData(): void {
    localStorage.removeItem(AUTH_DATA)
  }
}
