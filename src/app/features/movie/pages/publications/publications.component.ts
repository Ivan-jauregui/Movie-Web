import { Component, inject, signal } from '@angular/core';
import { PublicationService } from '../../services/publication-service.service';
import { Publication } from '../../models/publicacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publications',
  imports: [CommonModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent {
  private publicationService = inject(PublicationService);

  public publications = signal<Publication[]>([]);

  ngOnInit(): void {
    this.loadPublications();
  }

  private loadPublications(): void {
    this.publicationService.getAll().subscribe({
      next: (data) => {
        this.publications.set(data);
      },
      error: (err) => {
        console.error('Error al cargar las publicaciones:', err);
      }
    });
  }
}
