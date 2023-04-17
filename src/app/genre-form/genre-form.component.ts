import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import FieldErrorType from 'src/types/field-error-type';
import GenreFormType from 'src/types/genre-form-type';
import { notBlankValidator } from 'src/utils/custom-validators';
import InputFieldUtil from 'src/utils/input-field-util';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.css']
})
export class GenreFormComponent implements OnChanges {

  wasSubmited = false;

  ngOnChanges(): void {
    this.form.patchValue({
      name: this.defaultValues?.name,
      imageUrl: this.defaultValues?.imageUrl
    });
  }

  @Input() serverErrors: Array<FieldErrorType> = [];
  @Input() defaultValues: GenreFormType | undefined;
  @Output() submitForm = new EventEmitter<GenreFormType>

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: notBlankValidator()
    }),
    imageUrl: new FormControl('', {
      nonNullable: true,
      validators: notBlankValidator()//[Validators.pattern('(http(s?):)(\.)*'), Validators.required]
    })
  })

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
    this.wasSubmited = true
    if(this.form.status === 'VALID') {
      this.submitForm.emit(this.form.value as GenreFormType);
    }
  }
}
