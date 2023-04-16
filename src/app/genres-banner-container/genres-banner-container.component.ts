import { Component, Input } from '@angular/core';
import GenreType from 'src/types/genre-type';

@Component({
  selector: 'app-genres-banner-container',
  templateUrl: './genres-banner-container.component.html',
  styleUrls: ['./genres-banner-container.component.css']
})
export class GenresBannerContainerComponent {

  @Input() genres!: Array<GenreType>;
}
