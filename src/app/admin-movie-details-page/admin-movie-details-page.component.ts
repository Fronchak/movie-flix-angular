import { Component, OnInit } from '@angular/core';
import MovieType from 'src/types/movie-type';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-movie-details-page',
  templateUrl: './admin-movie-details-page.component.html',
  styleUrls: ['./admin-movie-details-page.component.css']
})
export class AdminMovieDetailsPageComponent implements OnInit {

  movie: MovieType | undefined;

  constructor(private movieService: MovieService,
          private route: ActivatedRoute,
          private router: Router,
          private toastr: ToastrService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.movieService.findById(parseInt(id)).subscribe({
      next: (movie) => this.movie = movie,
      error: (err: HttpErrorResponse) => {
        let message: string;
        if(err.status === 404) {
          message = 'Movie not found';
        }
        else {
          message = 'Something go wrong, please try again later';
        }
        this.toastr.error(message, 'Movie Flix');
        this.router.navigate(['/admin/movies']);
      }
    })
  }

}
