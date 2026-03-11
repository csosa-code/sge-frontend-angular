import type { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageSrv = inject(StorageService);

  if (storageSrv.isAuthenticated()) {
    router.navigate(['/app/dashboard']);
    return false;
  }
  return true;
};
