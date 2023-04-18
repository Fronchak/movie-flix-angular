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
  pageSize: number = 4;
  isLoading: boolean = false;
  movieFilter: MovieFilterType = {
    title: '',
    idGenre: 0,
    rating: 0
  }

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.handleFilter(this.movieFilter);
  }

  handleFilter(filter: MovieFilterType, page: number = 0) {
    this.isLoading = true;
    this.movieFilter = filter;
    this.movieService.findAll(filter, page, this.pageSize).subscribe({
      next: (page) => {
        this.isLoading = false;
        this.page = page;
      },
      error: (err) => console.error(err)
    })
  }

  pageChanged(page: number) {
    this.handleFilter(this.movieFilter, page);
  }
}
