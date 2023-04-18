import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import SpringPageType from 'src/types/vendor/spring-page-type';
import MovieCardType from 'src/types/movie-card-type';

@Component({
  selector: 'app-admin-movies-page',
  templateUrl: './admin-movies-page.component.html',
  styleUrls: ['./admin-movies-page.component.css']
})
export class AdminMoviesPageComponent implements OnInit {

  page: SpringPageType<MovieCardType> | undefined;
  isLoading: boolean  = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.movieService.findAll().subscribe({
      next: (page) => {
        this.isLoading = false;
        this.page = page
      },
      error: (err) => console.error(err)
    });
  }
}
