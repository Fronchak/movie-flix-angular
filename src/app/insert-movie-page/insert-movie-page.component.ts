import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import MovieFormType from 'src/types/movie-form-type';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import ApiValidationErrorResponse from 'src/types/api-validation-error-response';
import FieldErrorType from 'src/types/field-error-type';

@Component({
  selector: 'app-insert-movie-page',
  templateUrl: './insert-movie-page.component.html',
  styleUrls: ['./insert-movie-page.component.css']
})
export class InsertMoviePageComponent {

  movie: MovieFormType | undefined;
  serverErrors: Array<FieldErrorType> = [];

  constructor(private movieService: MovieService,
            private router: Router,
            private toastr: ToastrService) {}

  handleSubmit(movieForm: MovieFormType) {
    this.movieService.save(movieForm).subscribe({
      next: (movie) => {
        console.log(movie);
        this.router.navigate(["/admin/movies"])
      },
      error: (err: HttpErrorResponse) => {
        if(err.status !== 422) {
          this.toastr.error('Something go wrong, please try again later', 'Movie Flix');
        }
        else {
          const serverError: ApiValidationErrorResponse = err.error;
          this.movie = movieForm;
          this.serverErrors = serverError.errors;
          this.toastr.error('Invalid values', 'Movie Flix');
        }
      }
    })
  }
}
