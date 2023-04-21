import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import FieldErrorType from 'src/types/field-error-type';
import { notBlankValidator } from 'src/utils/custom-validators';
import InputFieldUtil from 'src/utils/input-field-util';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  serverErrors: Array<FieldErrorType> = [];
  wasSubmited: boolean = false;

  constructor(private authService: AuthService,
            private router: Router,
            private route: ActivatedRoute,
            private toastr: ToastrService,
            private storageService: StorageService) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap);
    console.log(this.route.snapshot.queryParamMap.get('redirectTo'));
  }

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [notBlankValidator(), Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [notBlankValidator(), Validators.minLength(6)]
    })
  });

  fieldIsValid(fieldName: string) {
    const field = this.form.get(fieldName) as AbstractControl;
    return InputFieldUtil.isValid(field) && !this.getServerError(fieldName);
  }

  fieldIsInvalid(fieldName: string) {
    const field = this.form.get(fieldName) as AbstractControl;
    return InputFieldUtil.isInvalid(field) || (field.invalid && this.wasSubmited) || this.getServerError(fieldName);
  }

  getServerError(fieldName: string): string | undefined {
    return this.serverErrors.find((fieldError) => fieldError.fieldName === fieldName)?.message;
  }

  onSubmit() {
    this.wasSubmited = true;
    if(this.form.status === 'VALID') {
      const values = this.form.value;
      this.authService.login({
        email: values.email!,
        password: values.password!
      }).subscribe({
        next: (token) => {
          const data = this.route.snapshot.data;
          const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/movies';
          console.log(this.route.snapshot.paramMap.get('redirectTo'));
          console.log('data', data);
          console.log('redirectTo', redirectTo)
          this.storageService.saveAuthData(token);
          this.toastr.success('Login with success');
          this.router.navigateByUrl(redirectTo);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }
}
