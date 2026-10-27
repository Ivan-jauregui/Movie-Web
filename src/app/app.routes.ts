import { Routes } from '@angular/router';


import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
{
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { 
        path: 'home', 
        loadComponent: () => import('./features/public/pages/home/home.component').then(m=>m.HomeComponent)
      },
      { 
        path: 'how-it-works', 
        loadComponent: () => import('./features/public/pages/how-it-works/how-it-works.component').then(m=>m.HowItWorksComponent)
      },
      { 
        path: 'catalog', 
        loadChildren: () => import('./features/catalog/catalog.routes').then(m => m.CATALOG_ROUTES) 
      },
      { 
        path: 'profile/public/:userId', 
        loadComponent: () => import('./features/profile/pages/public-profile/public-profile.component').then(m=>m.PublicProfileComponent)
      },
      { 
        path: 'auth', 
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) 
      }
    ]
  },

  // 🛒 RUTAS COMPRADOR (Requieren Login, usan PublicLayout para conservar la navegación)
  {
    path: '',
    component: PublicLayoutComponent,
    //canActivate: [authGuard],
    children: [
      { 
        path: 'checkout', 
        loadChildren: () => import('./features/checkout/checkout.routes').then(m => m.CHECKOUT_ROUTES)
      },
      { 
        path: 'my-reservations', 
        loadComponent: () => import('./features/buyer/pages/my-reservations/my-reservations.component').then(m=>m.MyReservationsComponent)
      },
      { 
        path: 'profile/me', 
        loadComponent: () => import('./features/profile/pages/my-profile/my-profile.component').then(m=>m.MyProfileComponent)
      }
    ]
  },

  // 🏠 PANEL VENDEDOR CON LAYOUT DEDICADO (Sidebar Lateral + Header Interno)
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    //canActivate: [authGuard],
    loadChildren: () => import('./features/vendor-dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },

  { path: '**', redirectTo: 'home' }
];
