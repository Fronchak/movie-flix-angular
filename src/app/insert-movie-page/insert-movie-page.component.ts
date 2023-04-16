import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import MovieFormType from 'src/types/movie-form-type';

@Component({
  selector: 'app-insert-movie-page',
  templateUrl: './insert-movie-page.component.html',
  styleUrls: ['./insert-movie-page.component.css']
})
export class InsertMoviePageComponent {

  constructor(private movieService: MovieService, private router: Router) {}

  handleSubmit(movieForm: MovieFormType) {
    this.movieService.save(movieForm).subscribe({
      next: (movie) => {
        console.log(movie);
        this.router.navigate(["/admin/movies"])
      },
      error: (err) => console.log(err)
    })
  }
}
