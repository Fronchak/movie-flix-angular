import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils/constantes'
import MovieFormType from 'src/types/movie-form-type';
import MovieType from 'src/types/movie-type';
import MovieCardType from 'src/types/movie-card-type';
import SpringPageType from 'src/types/vendor/spring-page-type';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private URL = `${BASE_URL}/movies`;

  constructor(private http: HttpClient) { }

  save(movieForm: MovieFormType) {
    return this.http.post<MovieType>(this.URL, movieForm);
  }

  findAll() {
    return this.http.get<SpringPageType<MovieCardType>>((this.URL));
  }

  findById(id: number) {
    return this.http.get<MovieType>(`${this.URL}/${id}`);
  }

  update(movieForm: MovieFormType, id: number) {
    return this.http.put<MovieType>(`${this.URL}/${id}`, movieForm);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
