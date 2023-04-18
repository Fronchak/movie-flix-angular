import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import MovieCardType from 'src/types/movie-card-type';
import SpringPageType from 'src/types/vendor/spring-page-type';
import MovieFilterType from 'src/types/movie-filter-type';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {

  page: SpringPageType<MovieCardType> | undefined;
  isLoading: boolean = false;
  movieFilter: MovieFilterType = {
    title: '',
    idGenre: 0,
    rating: 0
  }

  collection: Array<number> = [1, 2, 3, 4, 5, 6];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.movieService.findAll().subscribe({
      next: (page) => {
        this.isLoading = false;
        this.page = page;
      },
      error: (err) => console.error(err)
    })
  }

  handleFilter(filter: MovieFilterType) {
    this.isLoading = true;
    this.movieFilter = filter;
    this.movieService.findAll(filter).subscribe({
      next: (page) => {
        this.isLoading = false;
        this.page = page;
      },
      error: (err) => console.error(err)
    })
  }

  pageChanged(page: number) {
    this.isLoading = true;
    this.movieService.findAll(this.movieFilter, page - 1).subscribe({
      next: (page) => {
        this.isLoading = false;
        this.page = page;
      },
      error: (err) => console.error(err)
    })
  }
}
