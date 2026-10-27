import { Routes } from '@angular/router';

export const CATALOG_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.CatalogComponent) 
  },
  { 
    path: ':id', 
    loadComponent: () => import('./pages/publication-detail/publication-detail.component').then(m => m.PublicationDetailComponent) 
  }
];