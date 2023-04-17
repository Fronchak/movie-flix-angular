import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import MovieFormType from 'src/types/movie-form-type';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import ApiValidationErrorResponse from 'src/types/api-validation-error-response';
import FieldErrorType from 'src/types/field-error-type';

@Component({
  selector: 'app-update-movie-page',
  templateUrl: './update-movie-page.component.html',
  styleUrls: ['./update-movie-page.component.css']
})
export class UpdateMoviePageComponent implements OnInit {

  movie: MovieFormType | undefined;
  serverErrors: Array<FieldErrorType> = [];
  id!: number;

  constructor(private movieService: MovieService,
          private route: ActivatedRoute,
          private router: Router,
          private toastr: ToastrService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.id = parseInt(id);
    this.movieService.findById(this.id).subscribe({
      next: (movie) => {
        const idGenres = movie.genres.map((genre) => genre.id);
        this.movie = { ...movie, idGenres };
      },
      error: (err: HttpErrorResponse) => {
        let message: string;
        if(err.status === 404) {
          message = 'Movie not found'
        }
        else {
          message = "Something go wrong, please try again later"
        }
        this.router.navigate(['/admin/movies']);
        this.toastr.error(message, 'Movie Flix');
      }
    });
  }

  handleSubmit(movieForm: MovieFormType) {
    this.movieService.update(movieForm, this.id).subscribe({
      next: () => this.router.navigate(["/admin/movies"]),
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
