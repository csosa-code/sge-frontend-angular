import { Routes } from "@angular/router";


export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión',
    loadComponent: () => import('./pages/login/login.page')
  },
  {
    path: 'register',
    title: 'Crear cuenta',
    loadComponent: () => import('./pages/register/register.page')
  }
];