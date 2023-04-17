import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../utils/constantes';
import GenreFormType from 'src/types/genre-form-type';
import GenreType from 'src/types/genre-type';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private URL = `${BASE_URL}/genres`;

  constructor(private http: HttpClient) { }

  save(genreForm: GenreFormType) {
    return this.http.post<GenreType>(this.URL, genreForm)
  }

  findAll() {
    return this.http.get<Array<GenreType>>(this.URL);
  }

  findById(id: number) {
    return this.http.get<GenreType>(`${this.URL}/${id}`);
  }

  update(genreForm: GenreFormType, id: number) {
    return this.http.put<GenreType>(`${this.URL}/${id}`, genreForm);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
