import { Injectable, signal } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies = signal<Movie[]>([])
  
  constructor() { }
}
