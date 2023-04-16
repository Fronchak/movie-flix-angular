import { Component, Input } from '@angular/core';
import GenreType from 'src/types/genre-type';

@Component({
  selector: 'app-genre-banner',
  templateUrl: './genre-banner.component.html',
  styleUrls: ['./genre-banner.component.css']
})
export class GenreBannerComponent {

  @Input() genre!: GenreType;
}
