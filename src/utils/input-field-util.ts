import { AbstractControl } from '@angular/forms';

class InputFieldUtil {

  static isValid(field: AbstractControl): boolean {
    return field.valid && InputFieldUtil.wasDityOrTouched(field);
  }

  static wasDityOrTouched(field: AbstractControl): boolean {
    return (field.dirty || field.touched);
  }

  static isInvalid(field: AbstractControl): boolean {
    return field.invalid && InputFieldUtil.wasDityOrTouched(field);
  }
}

export default InputFieldUtil;
