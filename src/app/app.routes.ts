import { Routes } from '@angular/router';
import { AnimationRoutes, ExampleRoutes } from '@core/config/routes.config';
import { HomeComponent } from '@routes/home/home.component';
import { PageNotFoundComponent } from '@routes/page-not-found/page-not-found.component';
import { SingletonSecondComponent } from '@routes/singleton-second/singleton-second.component';


export const routes: Routes = [
  {
    path: '',
    title: 'Главная',
    component: HomeComponent,
    children: [
      {
        path: AnimationRoutes.Counter,
        title: 'Счётчик',
        loadComponent: () => import('./routes/counter/counter.component').then(m => m.CounterComponent)
      },
      { path: AnimationRoutes.Counters,
        title: 'Счётчики',
        loadComponent: () => import('./routes/counters/counters.component').then(m => m.CountersComponent)
      },
      {
        path: ExampleRoutes.Parent,
        title: 'Parent',
        loadComponent: () => import('./routes/parent/parent.component').then(m => m.ParentComponent)
      },
      {
        path: ExampleRoutes.Child,
        title: 'Child',
        loadComponent: () => import('./routes/child/child.component').then(m => m.ChildComponent)
      },
      {
        path: ExampleRoutes.Singleton,
        title: 'Singleton',
        loadComponent: () => import('./routes/singleton/singleton.component').then(m => m.SingletonComponent)
      },
      {
        path: ExampleRoutes.SingletonSecond,
        title: 'Singleton Second',
        loadComponent: () => import('./routes/singleton-second/singleton-second.component').then(m => m.SingletonSecondComponent)
      }
    ]
  },
  { path: '**', title: 'Страница не найдена', component: PageNotFoundComponent }
];
