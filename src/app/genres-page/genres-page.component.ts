import { Component, OnInit } from '@angular/core';
import { GenreService } from '../genre.service';
import GenreType from 'src/types/genre-type';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.css']
})
export class GenresPageComponent implements OnInit {

  genres: Array<GenreType> | undefined;

  constructor(private genreService: GenreService,
          private toastr: ToastrService) {}

  ngOnInit(): void {
    this.genreService.findAll().subscribe({
      next: (genres) => this.genres = genres,
      error: (err) => console.error(err)
    })
  }

  handleDelete(id: number) {
    this.genreService.delete(id).subscribe({
      next: () => {
        this.genres = this.genres?.filter((genre) => genre.id !== id);
        this.toastr.success('Genre was deleted with success', 'Movie Flix');
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === 400) {
          this.toastr.error(`This genre cannot be deleted, It's already been used`, 'Movie Flix')
        }
        else {
          this.toastr.error(`Something go wrong`, 'Movie Flix')
        }
      }
    })
  }
}
