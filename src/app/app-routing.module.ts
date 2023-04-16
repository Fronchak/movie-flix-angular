import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminMoviesPageComponent } from './admin-movies-page/admin-movies-page.component';
import { InsertMoviePageComponent } from './insert-movie-page/insert-movie-page.component';
import { GenresPageComponent } from './genres-page/genres-page.component';
import { InsertGenrePageComponent } from './insert-genre-page/insert-genre-page.component';
import { UpdateGenrePageComponent } from './update-genre-page/update-genre-page.component';
import { UpdateMoviePageComponent } from './update-movie-page/update-movie-page.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';

const routes: Routes = [
  { path: "", component: HomePageComponent, pathMatch:"full" },
  { path: "movies", component: MoviesPageComponent },
  { path: "movies/:id", component: MovieDetailsPageComponent },
  { path: "admin", component: AdminPageComponent, children: [
      { path: "", redirectTo: "movies", pathMatch: "full" },
      { path: "movies", component: AdminMoviesPageComponent },
      { path: "movies/insert", component: InsertMoviePageComponent },
      { path: "movies/update/:id", component: UpdateMoviePageComponent },
      { path: "genres", component: GenresPageComponent },
      { path: "genres/insert", component: InsertGenrePageComponent },
      { path: "genres/update/:id", component: UpdateGenrePageComponent }
  ]},
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
