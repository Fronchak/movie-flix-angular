import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../utils/constantes';
import GenreFormType from 'src/types/genre-form-type';
import GenreType from 'src/types/genre-type';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private URL = `${BASE_URL}/genres`;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  save(genreForm: GenreFormType) {
    const token = this.storageService.getAuthData();
    return this.http.post<GenreType>(this.URL, genreForm, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    })
  }

  findAll() {
    return this.http.get<Array<GenreType>>(this.URL);
  }

  findById(id: number) {
    const token = this.storageService.getAuthData();
    return this.http.get<GenreType>(`${this.URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });
  }

  update(genreForm: GenreFormType, id: number) {
    const token = this.storageService.getAuthData();
    return this.http.put<GenreType>(`${this.URL}/${id}`, genreForm, {
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
