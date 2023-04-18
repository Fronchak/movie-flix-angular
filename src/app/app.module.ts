import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';

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
import { GenreFormComponent } from './genre-form/genre-form.component';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { GenresPageComponent } from './genres-page/genres-page.component';
import { InsertGenrePageComponent } from './insert-genre-page/insert-genre-page.component';
import { UpdateGenrePageComponent } from './update-genre-page/update-genre-page.component';
import { UpdateMoviePageComponent } from './update-movie-page/update-movie-page.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { GenreBannerComponent } from './genre-banner/genre-banner.component';
import { GenresBannerContainerComponent } from './genres-banner-container/genres-banner-container.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AdminMovieDetailsPageComponent } from './admin-movie-details-page/admin-movie-details-page.component';
import { MovieCardLoaderComponent } from './movie-card-loader/movie-card-loader.component';
import { AdminMovieCardLoaderComponent } from './admin-movie-card-loader/admin-movie-card-loader.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationLoaderComponent } from './pagination-loader/pagination-loader.component';

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
    FooterComponent,
    GenreFormComponent,
    GenreCardComponent,
    GenresPageComponent,
    InsertGenrePageComponent,
    UpdateGenrePageComponent,
    UpdateMoviePageComponent,
    MovieDetailsPageComponent,
    GenreBannerComponent,
    GenresBannerContainerComponent,
    MovieDetailsComponent,
    AdminMovieDetailsPageComponent,
    MovieCardLoaderComponent,
    AdminMovieCardLoaderComponent,
    PaginationComponent,
    PaginationLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
