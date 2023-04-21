import { Component, EventEmitter, Input, Output } from '@angular/core';
import GenreType from 'src/types/genre-type';
import { GenreService } from '../genre.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.css']
})
export class GenreCardComponent {

  @Input() genre!: GenreType;
  @Output() onDelete = new EventEmitter<number>();

  constructor(protected tokenService: TokenService) {}

  onClick() {
    if(window.confirm('Are you sure that you want to delete this genre ?')) {
      this.onDelete.emit(this.genre.id!);
    }
  }
}
