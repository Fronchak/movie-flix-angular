import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URL } from '../utils/constantes';
import RegisterFormType from 'src/types/register-form-type';
import TokenResponseType from 'src/types/token-response-type';
import LoginFormType from 'src/types/login-form-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = `${BASE_URL}/auth`;

  constructor(private http: HttpClient) { }

  register(registerForm: RegisterFormType) {
    return this.http.post<TokenResponseType>(`${this.URL}/register`, registerForm);
  }

  login(loginForm: LoginFormType) {
    return this.http.post<TokenResponseType>(`${this.URL}/login`, loginForm);
  }
}
