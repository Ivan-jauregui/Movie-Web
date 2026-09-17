import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/page/home-page/home-page.component';
import { MovieListComponent } from './features/movie/pages/movie-list/movie-list.component';
import { MovieFormComponent } from './features/movie/pages/movie-form/movie-form.component';

export const routes: Routes = [
    {path:'',component:HomePageComponent},
    {path:'movie/catalog',component:MovieListComponent},
    {path:'movie/create',component:MovieFormComponent},
    {path:'**', redirectTo:''}  
];
