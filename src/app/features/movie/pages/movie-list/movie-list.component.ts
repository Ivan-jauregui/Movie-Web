import { Component, inject } from '@angular/core';  
import { FormMovieComponent } from '../../components/form-movie/form-movie.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  moviesService = inject(MovieService);
}
