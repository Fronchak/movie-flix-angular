import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from '../genre.service';
import GenreType from 'src/types/genre-type';
import GenreFormType from 'src/types/genre-form-type';
import { ToastrService } from 'ngx-toastr';
import FieldErrorType from 'src/types/field-error-type';
import { HttpErrorResponse } from '@angular/common/http';
import ApiValidationErrorResponse from 'src/types/api-validation-error-response';

@Component({
  selector: 'app-update-genre-page',
  templateUrl: './update-genre-page.component.html',
  styleUrls: ['./update-genre-page.component.css']
})
export class UpdateGenrePageComponent implements OnInit {

  genre!: GenreFormType;
  serverErrors: Array<FieldErrorType> = []
  private id!: number;

  constructor(private genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.id = parseInt(id);
    this.genreService.findById(this.id).subscribe({
      next: (genre) => this.genre = genre,
      error: (err: HttpErrorResponse) => {
        if(err.status === 404) {
          this.toastr.error('Genre not found', 'Movie Flix')
        }
        else {
          this.toastr.error('Something go wrong', 'Movie Flix')
        }
        this.router.navigate(['/admin/genres'])
      }
    })
  }

  handleSubmit(genreForm: GenreFormType) {
    this.genreService.update(genreForm, this.id).subscribe({
      next: () => {
        this.router.navigate(["/admin/genres"]);
        this.toastr.success('Genre updated with sucess', "Movie Flix")
      },
      error: (err: HttpErrorResponse) => {
        if(err.status !== 422) {
          this.toastr.error('Something go wrong, please try again later', 'Movie Flix');
        }
        else {
          const backendError: ApiValidationErrorResponse = err.error;
          this.serverErrors = backendError.errors;
          this.genre = genreForm;
          this.toastr.error('Invalid values', 'Movie Flix')
        }
      }
    })
  }
}
