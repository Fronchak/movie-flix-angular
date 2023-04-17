import { Component, OnInit } from '@angular/core';
import MovieType from 'src/types/movie-type';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import MovieFormType from 'src/types/movie-form-type';

@Component({
  selector: 'app-update-movie-page',
  templateUrl: './update-movie-page.component.html',
  styleUrls: ['./update-movie-page.component.css']
})
export class UpdateMoviePageComponent implements OnInit {

  movie: MovieType | undefined;
  id!: number;

  constructor(private movieService: MovieService,
          private route: ActivatedRoute,
          private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.id = parseInt(id);
    this.movieService.findById(this.id).subscribe({
      next: (movie) => {
        console.log(movie);
        this.movie = movie;
      },
      error: (err) => console.error(err)
    });
  }

  handleSubmit(movieForm: MovieFormType) {
    this.movieService.update(movieForm, this.id).subscribe({
      next: () => this.router.navigate(["/admin/movies"]),
      error: (err) => console.error(err)
    })
  }

}
