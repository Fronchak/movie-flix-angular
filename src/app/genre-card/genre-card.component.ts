import { Component, Input } from '@angular/core';
import GenreType from 'src/types/genre-type';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.css']
})
export class GenreCardComponent {

  @Input() genre!: GenreType;
}
