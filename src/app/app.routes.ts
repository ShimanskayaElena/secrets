import { Routes } from '@angular/router';
import { HomeComponent } from '@home/home.component';
import { PageNotFoundComponent } from '../app/views/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', title: 'Главная', component: HomeComponent },
  { path: '**', title: 'Страница не найдена', component: PageNotFoundComponent }
];
