import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import StringUtil from './string-util';

export function notBlankValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isBlank = StringUtil.isBlank(control.value);
    return isBlank ? { blankInput: { msg: 'Field cannot be blank' } } : null
  }
}

export const samePasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value !== confirmPassword.value ? {
    differentPasswords: { msg: 'Passwords must be the same' }
  } : null;
}
