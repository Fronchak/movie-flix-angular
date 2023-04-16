import { Component, Input } from '@angular/core';
import MovieCardType from 'src/types/movie-card-type';

@Component({
  selector: 'app-admin-movie-card',
  templateUrl: './admin-movie-card.component.html',
  styleUrls: ['./admin-movie-card.component.css']
})
export class AdminMovieCardComponent {

  @Input() movie!: MovieCardType;
}
