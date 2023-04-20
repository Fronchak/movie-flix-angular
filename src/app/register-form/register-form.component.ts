import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import FieldErrorType from 'src/types/field-error-type';
import { notBlankValidator, samePasswordValidator } from 'src/utils/custom-validators';
import InputFieldUtil from 'src/utils/input-field-util';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  serverErrors: Array<FieldErrorType> = [];
  wasSubmited: boolean = false;

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [notBlankValidator(), Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [notBlankValidator(), Validators.minLength(6)]
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [notBlankValidator(), Validators.minLength(6)]
    })
  }, { validators: samePasswordValidator })

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

  getDifferentPasswordError(): string | undefined {
    return (this.wasSubmited && this.form.errors?.['differentPasswords']) ? this.form.errors?.['differentPasswords']?.msg : undefined;
  }

  onSubmit() {
    this.wasSubmited = true;
    if(this.form.status === 'VALID') {
      console.log('Sendo to backend');
    }
  }
}
