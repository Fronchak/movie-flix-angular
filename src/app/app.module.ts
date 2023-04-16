import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MovieFilterComponent } from './movie-filter/movie-filter.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { StarComponent } from './star/star.component';
import { StarsComponent } from './stars/stars.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminMovieCardComponent } from './admin-movie-card/admin-movie-card.component';
import { AdminMoviesPageComponent } from './admin-movies-page/admin-movies-page.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { InsertMoviePageComponent } from './insert-movie-page/insert-movie-page.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    PageNotFoundComponent,
    MovieFilterComponent,
    MoviesPageComponent,
    MovieCardComponent,
    StarComponent,
    StarsComponent,
    AdminPageComponent,
    AdminMovieCardComponent,
    AdminMoviesPageComponent,
    MovieFormComponent,
    InsertMoviePageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
