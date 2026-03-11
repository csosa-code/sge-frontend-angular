import type { CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const storageSrv = inject(StorageService);

  if (!storageSrv.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
