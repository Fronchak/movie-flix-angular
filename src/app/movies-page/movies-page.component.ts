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

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.findAll().subscribe({
      next: (page) => {
        console.log(page);
        this.page = page;
      },
      error: (err) => console.error(err)
    })
  }

  handleFilter(filter: MovieFilterType) {
    this.movieService.findAllFilter(filter).subscribe({
      next: (page) => {
        console.log(page);
        this.page = page;
      },
      error: (err) => console.error(err)
    })
  }
}
