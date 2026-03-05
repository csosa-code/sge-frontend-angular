import { Routes } from "@angular/router";


export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    title: 'Empleados',
    loadComponent: () => import('./pages/employees/employees.page')
  }
];