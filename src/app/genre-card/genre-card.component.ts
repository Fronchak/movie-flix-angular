import { Component, EventEmitter, Input, Output } from '@angular/core';
import GenreType from 'src/types/genre-type';
import { GenreService } from '../genre.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.css']
})
export class GenreCardComponent {

  @Input() genre!: GenreType;
  @Output() onDelete = new EventEmitter<number>();

  constructor(private genreService: GenreService,
          private router: Router,
          private toastr: ToastrService) {}

  onClick() {
    if(window.confirm('Are you sure that you want to delete this genre ?')) {
      this.onDelete.emit(this.genre.id!);
    }
  }
}
