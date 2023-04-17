import { Component, OnInit } from '@angular/core';
import MovieType from 'src/types/movie-type';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-movie-details-page',
  templateUrl: './admin-movie-details-page.component.html',
  styleUrls: ['./admin-movie-details-page.component.css']
})
export class AdminMovieDetailsPageComponent implements OnInit {

  movie: MovieType | undefined;

  constructor(private movieService: MovieService,
          private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.movieService.findById(parseInt(id)).subscribe({
      next: (movie) => this.movie = movie,
      error: (err) => console.error(err)
    })
  }

}
