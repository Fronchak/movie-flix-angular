import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from '../genre.service';
import GenreType from 'src/types/genre-type';
import GenreFormType from 'src/types/genre-form-type';

@Component({
  selector: 'app-update-genre-page',
  templateUrl: './update-genre-page.component.html',
  styleUrls: ['./update-genre-page.component.css']
})
export class UpdateGenrePageComponent implements OnInit {

  @Input() genre!: GenreType;
  private id!: number;

  constructor(private genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.id = parseInt(id);
    this.genreService.findById(this.id).subscribe({
      next: (genre) => this.genre = genre,
      error: (err) => console.error(err)
    })
  }

  handleSubmit(genreForm: GenreFormType) {
    this.genreService.update(genreForm, this.id).subscribe({
      next: (genre) => {
        console.log(genre);
        this.router.navigate(["/admin/genres"]);
      },
      error: (err) => console.error(err)
    })
  }
}
