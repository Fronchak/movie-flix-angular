import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminMoviesPageComponent } from './admin-movies-page/admin-movies-page.component';
import { InsertMoviePageComponent } from './insert-movie-page/insert-movie-page.component';

const routes: Routes = [
  { path: "", component: HomePageComponent, pathMatch:"full" },
  { path: "movies", component: MoviesPageComponent },
  { path: "admin", component: AdminPageComponent, children: [
      { path: "movies", component: AdminMoviesPageComponent },
      { path: "movies/insert", component: InsertMoviePageComponent }
  ]},
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
