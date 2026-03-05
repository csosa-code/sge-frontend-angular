import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./layouts/app-layout/app-layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard.component')
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./features/employees/employees.routes')
            .then(m => m.EMPLOYEES_ROUTES)
      },
      {
        path: 'areas',
        loadChildren: () =>
          import('./features/areas/areas.routes')
            .then(m => m.AREAS_ROUTES)
      }
    ]
  }
 
];

