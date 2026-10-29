import { Component, inject, input, Input, output } from '@angular/core';
import { Publication } from '../../../../core/models/publicacion';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'associated-publication-card',
  imports: [CommonModule],
  templateUrl: './associated-publication-card.component.html',
  styleUrl: './associated-publication-card.component.css'
})
export class AssociatedPublicationCard {
  associated_publication = input.required<Publication>();
  index = input<number>(0);
  total = input<number>(1);

 onSelect = output<string>(); 

  getAssociatedImageUrl(): string {
    const images = this.associated_publication()?.images;
    if (!images || images.length === 0) return 'assets/no-image.jpg';


    const principal = images.find(img => img.esPrincipal);
    return principal ? principal.url_images : images[0].url_images;
  }

  
  onCardClicked() {
    const id = this.associated_publication().id;

    if (id) {
      this.onSelect.emit(id);
    }
  }
}
