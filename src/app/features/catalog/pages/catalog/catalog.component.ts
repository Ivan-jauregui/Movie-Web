import { Component, inject, signal } from '@angular/core';
import { PublicationService } from '../../../../core/services/publication/publication-service';
import { Publication } from '../../../../core/models/publicacion';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PublicationImages } from '../../../../core/models/publication-images';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  private router = inject(Router)
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

  // Publicacion por parámetro
  getMainImageUrl(publication: Publication): string {
    const images = publication?.images;
    if (!images || images.length === 0) return 'assets/no-image.png';

    // Busca la principal, si no existe, agarra la primera del array
    const principal = images.find((img: PublicationImages) => img.esPrincipal);
 
    return principal ? principal.url_images : images[0].url_images;
  }


  viewDetails(id: string) {
    if (id) {
      this.router.navigate(['/catalog', id]);
    }
  }
}
