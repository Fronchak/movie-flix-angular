import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import FieldErrorType from 'src/types/field-error-type';
import { notBlankValidator } from 'src/utils/custom-validators';
import InputFieldUtil from 'src/utils/input-field-util';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  serverErrors: Array<FieldErrorType> = [];
  wasSubmited: boolean = false;

  constructor(private authService: AuthService,
            private router: Router,
            private toastr: ToastrService,
            private storageService: StorageService) {}

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
          this.storageService.saveAuthData(token);
          this.toastr.success('Login with success');
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }
}
