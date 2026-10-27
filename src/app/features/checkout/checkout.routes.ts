import { Routes } from '@angular/router';

export const CHECKOUT_ROUTES: Routes = [
  { 
    path: ':publicationId', 
    loadComponent: () => import('./pages/checkout-process/checkout-process.component').then(m => m.CheckoutProcessComponent) 
  },
  { 
    path: 'success', 
    loadComponent: () => import('./pages/checkout-success/checkout-success.component').then(m => m.CheckoutSuccessComponent) 
  }
];