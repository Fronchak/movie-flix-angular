import { Component } from '@angular/core';
import { GenreService } from '../genre.service';
import GenreFormType from 'src/types/genre-form-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-genre-page',
  templateUrl: './insert-genre-page.component.html',
  styleUrls: ['./insert-genre-page.component.css']
})
export class InsertGenrePageComponent {

  constructor(private genreService: GenreService, private router: Router) {}

  handleSubmit(genreForm: GenreFormType) {
    console.log('no handle submit');
    this.genreService.save(genreForm).subscribe({
      next: (genre) => {
        console.log(genre);
        this.router.navigate(['/admin/genres'])
      },
      error: (err) => console.error(err)
    });
  }
}
