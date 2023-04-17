import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import GenreFormType from 'src/types/genre-form-type';
import GenreType from 'src/types/genre-type';
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

  @Input() defaultValues: GenreType | undefined;
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
    return InputFieldUtil.isValid(field);
  }

  fieldIsInvalid(fieldName: string) {
    const field = this.form.get(fieldName) as AbstractControl;
    return InputFieldUtil.isInvalid(field) || (field.invalid && this.wasSubmited);
  }

  onSubmit() {
    this.wasSubmited = true
    console.log(this.form.value)
    console.log(this.form.status);
    if(this.form.status === 'VALID') {
      this.submitForm.emit(this.form.value as GenreFormType);
    }
  }
}
