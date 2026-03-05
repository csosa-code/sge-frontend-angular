import { Injectable, inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastDialogService implements OnDestroy {
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);
  private sub: Subscription;

  constructor() {
    this.sub = this.dialog.afterOpened.subscribe(() => {
      // Cuando abre cualquier dialog, subir z-index del toast container
      const toastEl = document.querySelector('.toast-container') as HTMLElement;
      if (toastEl) {
        toastEl.style.zIndex = '99999';
        toastEl.style.position = 'fixed';
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}