import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AbstractControl, Validators, FormGroup, FormControl } from '@angular/forms';
import MovieFormType from 'src/types/movie-form-type';
import MovieType from 'src/types/movie-type';
import { notBlankValidator } from 'src/utils/custom-validators';
import InputFieldUtil from 'src/utils/input-field-util';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnChanges {

  @Input() defaultValues: MovieType | undefined;
  @Output() submitForm = new EventEmitter<MovieFormType>

  ngOnChanges(): void {
    console.log('call ngOnChanges');
    this.form.patchValue({
      title: this.defaultValues?.title,
      synopsis: this.defaultValues?.synopsis,
      launchYear: this.defaultValues?.launchYear,
      rating: this.defaultValues?.rating,
      imageUrl: this.defaultValues?.imageUrl,
      genres: this.defaultValues?.genres ? this.defaultValues.genres.map((genre) => genre.id || 0) : []
    })
  }

  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: notBlankValidator()
    }),
    synopsis: new FormControl('', {
      nonNullable: true,
      validators: notBlankValidator()
    }),
    launchYear: new FormControl<number | null>(null,
      [Validators.min(1900), Validators.max(2024), Validators.required]
    ),
    rating: new FormControl<number | null>(null,
      [Validators.min(0), Validators.max(10), Validators.required]
    ),
    imageUrl: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)'), Validators.required]
    }),
    genres: new FormControl<Array<number>>([], {
      nonNullable: true,
      validators: Validators.required
    })
  });

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
    console.log(this.form.status);
    if(this.form.status === 'VALID') {
      const idGenres = [1, 2]
      this.submitForm.emit({ ...this.form.value, idGenres } as unknown as MovieFormType);
    }
  }
}
