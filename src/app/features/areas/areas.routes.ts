import { Routes } from "@angular/router";


export const AREAS_ROUTES: Routes = [
  {
    path: '',
    title: 'Departamentos',
    loadComponent: () => import('./pages/areas/areas.page')
  }
];