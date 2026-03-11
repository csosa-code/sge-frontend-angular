import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private router = inject(Router);

  private readonly SESSION_KEY = 'currentUser';
  private readonly TOKEN_KEY = 'token';

  // =========================
  // SESSION
  // =========================

  setSession(user: any): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  }

  getSession(): any | null {
    const session = localStorage.getItem(this.SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  removeSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  // =========================
  // TOKEN
  // =========================

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // =========================
  // AUTH
  // =========================

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.removeToken();
    this.removeSession();

    this.router.navigate(['/auth/login']);
  }

}
