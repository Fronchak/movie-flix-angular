import { Component, Input } from '@angular/core';
import MovieCardType from 'src/types/movie-card-type';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() movie!: MovieCardType;
}
