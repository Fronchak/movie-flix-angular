import { Component, Input } from '@angular/core';
import ProductCardType from 'src/types/product-card-type';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() product!: ProductCardType;
}
