import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/page/home-page/home-page.component';
import { FormPublicationComponent } from './features/movie/components/form-publication/form-publication.component';
import { PublicationsComponent } from './features/movie/pages/publications/publications.component';

export const routes: Routes = [
    {path:'',component:HomePageComponent},
    {path:'muvix/publications',component:PublicationsComponent},
    {path:'muvix/publications/create',component:FormPublicationComponent},
    {path:'**', redirectTo:''}  
];
