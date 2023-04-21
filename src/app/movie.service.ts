import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils/constantes'
import MovieFormType from 'src/types/movie-form-type';
import MovieType from 'src/types/movie-type';
import MovieCardType from 'src/types/movie-card-type';
import SpringPageType from 'src/types/vendor/spring-page-type';
import MovieFilterType from 'src/types/movie-filter-type';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private URL = `${BASE_URL}/movies`;

  constructor(private http: HttpClient,
            private storageService: StorageService) { }

  save(movieForm: MovieFormType) {
    const token = this.storageService.getAuthData();
    return this.http.post<MovieType>(this.URL, movieForm, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });
  }

  findAll(filter: MovieFilterType = {
    title: '',
    idGenre: 0,
    rating: 0
  }, page: number = 0, size: number = 2) {
    console.log(`${this.URL}?title=${filter.title}&idGenre=${filter.idGenre}&rating=${filter.rating}&page=${page}&size=${size}`)
    return this.http.get<SpringPageType<MovieCardType>>((`${this.URL}?title=${filter.title}&idGenre=${filter.idGenre}&rating=${filter.rating}&page=${page}&size=${size}`));
  }

  findById(id: number) {
    const token = this.storageService.getAuthData();
    return this.http.get<MovieType>(`${this.URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });
  }

  update(movieForm: MovieFormType, id: number) {
    const token = this.storageService.getAuthData();
    return this.http.put<MovieType>(`${this.URL}/${id}`, movieForm, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });
  }

  delete(id: number) {
    const token = this.storageService.getAuthData();
    return this.http.delete<void>(`${this.URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });
  }
}
