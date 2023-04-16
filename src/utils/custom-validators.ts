import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import StringUtil from './string-util';

export function notBlankValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isBlank = StringUtil.isBlank(control.value);
    return isBlank ? { blankInput: { msg: 'Field cannot be blank' } } : null
  }
}
