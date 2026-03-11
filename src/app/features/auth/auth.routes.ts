import { Routes } from "@angular/router";
import { guestGuard } from "../../core/guards/guest.guard";


export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login.page')
  },
  {
    path: 'register',
    title: 'Crear cuenta',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/register/register.page')
  }
];