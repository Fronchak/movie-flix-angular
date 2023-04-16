import { Component, OnInit } from '@angular/core';
import { GenreService } from '../genre.service';
import GenreType from 'src/types/genre-type';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.css']
})
export class GenresPageComponent implements OnInit {

  genres: Array<GenreType> | undefined;

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.genreService.findAll().subscribe({
      next: (genres) => this.genres = genres,
      error: (err) => console.error(err)
    })
  }
}
