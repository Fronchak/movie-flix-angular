import { Component } from '@angular/core';
import { TokenService } from '../token.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(protected tokenService: TokenService,
          private storageService: StorageService,
          private router: Router,
          private toastr: ToastrService) {}

  isAuth() {
    return this.tokenService.isAuthenticated();
  }

  getUser() {
    return this.tokenService.getTokenData()?.sub;
  }

  logout() {
    this.storageService.removeAuthData();
    this.toastr.info('Logout with success', 'Movie Flix');
    this.router.navigate(['']);
  }
}
