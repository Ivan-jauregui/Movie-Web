import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PublicationService } from '../../../../core/services/publication/publication-service';
import { Publication } from '../../../../core/models/publicacion';
import { CommonModule } from '@angular/common';
import { AssociatedPublicationCard } from '../../components/associated-publication-card/associated-publication-card.component';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../profile/pages/service/user.service';
import { SellerCard } from '../../components/seller-card/seller-card.component';


@Component({
  selector: 'app-publication-detail',
  imports: [CommonModule, RouterLink, AssociatedPublicationCard,SellerCard],
  templateUrl: './publication-detail.component.html',
  styleUrl: './publication-detail.component.css'
})
export class PublicationDetailComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private publicationService = inject(PublicationService);
  private userService = inject(UserService);

  publication = signal<Publication | null>(null);
  associatedPublications = signal<Publication[]>([]);
  selectedImage = signal<string | null>(null)

  user = signal<User | null>(null);


  defaultImg = computed(()=>{
    const images = this.publication()?.images;
    if (!images || images.length === 0) return 'assets/no-image.jpg';

    // Busca la principal, si no existe, agarra la primera del array
      const principal = images.find(img => img.esPrincipal);
      return principal ? principal.url_images : images[0].url_images;
  })

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');

    if (idParam) {
      this.selectedImage.set(null)
      this.loadPublication(idParam); 
    }
  });
  }


  loadPublication(id: string) {
    this.publicationService.getById(id).subscribe({
      next: (data) => {
        this.publication.set(data);
        this.loadUser(this.publication()?.userId!)
        if (this.publication()?.type == "LOTE") {
          this.loadAssociatedPublications(this.publication()!)
        }
      },
      error: (err) => {
        console.error('Error al cargar la publicación: ', err);
        this.publication.set(null);
      }
    });
  }

  loadAssociatedPublications(publication: Publication) {
    this.publicationService.getPublicationsByBatchId(+publication.id!).subscribe({
      next: (data) => {
        this.associatedPublications.set(data);

      },
      error: (err) => {
        console.error("Error al cargar las publicaciones asociadas:", err);
      }
    });
  }

  loadUser(id:string){
    this.userService.getById(id).subscribe({
      next:(data)=>{
        this.user.set(data);
      },
      error:(err)=>{
        console.log("Error al cargar el usuario: " + err)
      }
    })
  }


  selectImage(img:string){
    this.selectedImage.set(img)
  }

  viewDetails(id: string) {
    if (id) {
      this.router.navigate(['/catalog', id]);
    }
  }
}
