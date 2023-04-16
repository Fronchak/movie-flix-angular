import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { notBlankValidator } from 'src/utils/custom-validators';
import InputFieldUtil from 'src/utils/input-field-util';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {

  constructor(private formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    title: ['', notBlankValidator()],
    synopsis: ['', notBlankValidator()],
    launchYear: [, [Validators.min(1900), Validators.max(2024), Validators.required]],
    rating: [, [Validators.min(0), Validators.max(10), Validators.required]],
    imageUrl: ['', [Validators.required, Validators.pattern(/(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)/)]],
    genres: [null, [Validators.required]]
  });

  get title() {
    return this.form.get('title') as AbstractControl;
  }

  get synopsis() {
    return this.form.get('synopsis') as AbstractControl;
  }

  get launchYear() {
    return this.form.get('launchYear') as AbstractControl;
  }

  get rating() {
    return this.form.get('rating') as AbstractControl;
  }

  get imageUrl() {
    return this.form.get('imageUrl') as AbstractControl;
  }

  fieldIsValid(fieldName: string) {
    const field = this.form.get(fieldName) as AbstractControl;
    return InputFieldUtil.isValid(field);
  }

  fieldIsInvalid(fieldName: string) {
    const field = this.form.get(fieldName) as AbstractControl;
    return InputFieldUtil.isInvalid(field);
  }

  onSubmit() {
    console.log(this.form.value)
  }
}
