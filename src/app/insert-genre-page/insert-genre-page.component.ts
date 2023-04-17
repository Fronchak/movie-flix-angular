import { Component } from '@angular/core';
import { GenreService } from '../genre.service';
import GenreFormType from 'src/types/genre-form-type';
import { Router } from '@angular/router';
import FieldErrorType from 'src/types/field-error-type';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import ApiValidationErrorResponse from 'src/types/api-validation-error-response';

@Component({
  selector: 'app-insert-genre-page',
  templateUrl: './insert-genre-page.component.html',
  styleUrls: ['./insert-genre-page.component.css']
})
export class InsertGenrePageComponent {

  serverErrors: Array<FieldErrorType> = [];
  genre: GenreFormType | undefined;

  constructor(private genreService: GenreService,
          private router: Router,
          private toastr: ToastrService) {}

  handleSubmit(genreForm: GenreFormType) {
    console.log('no handle submit');
    this.genreService.save(genreForm).subscribe({
      next: (genre) => {
        this.router.navigate(['/admin/genres'])
        this.toastr.success('New genre register with success', "Movie Flix")
      },
      error: (err: HttpErrorResponse) => {
        if(err.status !== 422) {
          this.toastr.error('Something go wrong, please try again later', 'Movie Flix');
        }
        else  {
          const backendError: ApiValidationErrorResponse = err.error;
          this.serverErrors = backendError.errors;
          this.genre = genreForm;
          this.toastr.error('Invalid values', 'Movie Flix')
        }
      }
    });
  }
}
