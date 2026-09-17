import { Component, Inject, inject, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'form-movie',
  imports: [ReactiveFormsModule],
  templateUrl: './form-movie.component.html',
  styleUrl: './form-movie.component.css'
})
export class FormMovieComponent {
  form:FormGroup  
  router = inject(Router)
  moviesService = inject(MovieService)

  movie = signal<Movie | null>(null)

  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      img: ['',Validators.required],
      name: ['',[Validators.required,Validators.minLength(3)]],
      duration: ['',[Validators.required,Validators.min(60)]],
      director: ['',[Validators.required,Validators.minLength(3)]]
    })
  }

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  
  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {

      const base64Image = reader.result as string; 
      
     
      this.form.get('img')?.setValue(base64Image);
    };
    
    reader.readAsDataURL(file);
  }
}
  save(){
    if(this.form.valid){
        const formValue = this.form.value;

        const newMovie:Movie = {
          img:formValue.img,
          name: formValue.name,
          duration: formValue.duration,
          director: formValue.director
        };

      this.form.reset;  

      this.moviesService.movies.update(m => [newMovie, ...m]);
      this.router.navigate(['/movie/catalog'])
    }


  }
}
