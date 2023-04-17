import { Component, Input } from '@angular/core';
import MovieType from 'src/types/movie-type';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  @Input() movie!: MovieType;
}
