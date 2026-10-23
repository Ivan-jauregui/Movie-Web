import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Publication } from '../../models/publicacion';
import { PublicationService } from '../../services/publication-service.service';

@Component({
  selector: 'form-publication',
  imports: [ReactiveFormsModule],
  templateUrl: './form-publication.component.html',
  styleUrl: './form-publication.component.css'
})
export class FormPublicationComponent {
  form: FormGroup
  router = inject(Router)
  publicationService = inject(PublicationService)

  publication = signal<Publication | null>(null)

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      img: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required] // Aquí se guardará el objeto Category o su ID seleccionado
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

  save() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const newPublication: Publication = { 
        img: formValue.img, 
        title: formValue.title,
        description: formValue.description,
        price: formValue.price,
        category: formValue.category,
        createdAt: new Date()
      };

      this.publicationService.save(newPublication).subscribe({
        next:()=>{
          this.form.reset(); 
          this.router.navigate(["/"])
        },
        error:(err)=>{
          console.log("ERROR: Se produjo un error en el servidor: " + err)
        }
      })
    }
  }
}
