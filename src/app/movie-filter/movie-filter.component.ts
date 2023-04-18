import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenreService } from '../genre.service';
import GenreType from 'src/types/genre-type';
import MovieFilterType from 'src/types/movie-filter-type';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  genres: Array<GenreType> = [];
  title = '';
  idGenre: number = 0;
  rating: number = 0;
  @Output() filter = new EventEmitter<MovieFilterType>();

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.genreService.findAll().subscribe({
      next: (genres) => this.genres = genres
    })
  }

  onClick() {
    console.log(this.title);
    this.doFilter();
  }

  onChange() {
    console.log('onChange');
    console.log(this.idGenre);
    this.doFilter();
  }

  onRadioButtonChange(rating: number) {
    console.log('radio button');
    this.rating = rating;
    console.log(this.rating);
    this.doFilter();
  }

  private doFilter() {
    const movieFilter: MovieFilterType = {
      title: this.title,
      idGenre: this.idGenre,
      rating: this.rating
    }
    this.filter.emit(movieFilter);
  }
}
