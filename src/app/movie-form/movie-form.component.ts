import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, Validators, FormGroup, FormControl } from '@angular/forms';
import GenreType from 'src/types/genre-type';
import MovieFormType from 'src/types/movie-form-type';
import MovieType from 'src/types/movie-type';
import { notBlankValidator } from 'src/utils/custom-validators';
import InputFieldUtil from 'src/utils/input-field-util';
import { GenreService } from '../genre.service';
import FieldErrorType from 'src/types/field-error-type';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit, OnChanges {

  @Input() defaultValues: MovieFormType | undefined;
  @Input() serverErrors: Array<FieldErrorType> = [];
  @Output() submitForm = new EventEmitter<MovieFormType>
  genres: Array<GenreType> | undefined;
  wasSubmited: boolean = false;

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.genreService.findAll().subscribe({
      next: (genres) => {
        console.log(genres);
        this.genres = genres
      },
      error: (err) => console.error(err)
    })
  }

  ngOnChanges(): void {
    console.log('call ngOnChanges');
    this.form.patchValue({
      title: this.defaultValues?.title,
      synopsis: this.defaultValues?.synopsis,
      launchYear: this.defaultValues?.launchYear,
      rating: this.defaultValues?.rating,
      imageUrl: this.defaultValues?.imageUrl,
      genres: this.defaultValues?.idGenres
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
      validators: notBlankValidator()//[Validators.pattern('(http(s?):)(\.)*'), Validators.required]
    }),
    genres: new FormControl<Array<number>>([], {
      nonNullable: true,
      validators: Validators.required
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
    const values = this.form.value;
    console.log(this.form.value)
    console.log(this.form.status);
    if(this.form.status === 'VALID') {
      const data: MovieFormType = {
        title: values.title!,
        synopsis: values.synopsis!,
        launchYear: values.launchYear!,
        rating: values.rating!,
        imageUrl: values.imageUrl!,
        idGenres: values.genres!
      }
      this.submitForm.emit(data);
    }
  }
}
