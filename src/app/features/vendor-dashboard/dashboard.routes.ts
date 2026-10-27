import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/dashboard-overview/dashboard-overview.component').then(m => m.DashboardOverviewComponent) 
  },
  { 
    path: 'storage', 
    loadComponent: () => import('./pages/storage/storage.component').then(m => m.StorageComponent) 
  },
  { 
    path: 'listings', 
    loadComponent: () => import('./pages/listings/listings.component').then(m => m.ListingsComponent) 
  },
  { 
    path: 'sell', 
    loadComponent: () => import('./pages/sell/sell.component').then(m => m.SellComponent) 
  },
  { 
    path: 'agenda', 
    loadComponent: () => import('./pages/agenda/agenda.component').then(m => m.AgendaComponent) 
  }
];