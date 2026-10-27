import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PublicationService } from '../../../../core/services/publication/publication-service';
import { Publication } from '../../../../core/models/publicacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publication-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './publication-detail.component.html',
  styleUrl: './publication-detail.component.css'
})
export class PublicationDetailComponent {
  private route = inject(ActivatedRoute);
  private publicationService = inject(PublicationService);

  public publication = signal<Publication | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.publicationService.getById(idParam).subscribe({
        next: (data) => {
          this.publication.set(data);
        },
        error: (err) => {
          console.error('Error al cargar la publicación:', err);
          this.publication.set(null);
        }
      });
    }
  }

  getMainImageUrl(): string {
    const images = this.publication()?.images;
    if (!images || images.length === 0) return 'assets/no-image.png';

    // Busca la principal, si no existe, agarra la primera del array
    const principal = images.find(img => img.esPrincipal);
    return principal ? principal.url_images : images[0].url_images;
  }
}
