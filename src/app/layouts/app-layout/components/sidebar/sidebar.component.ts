import { Component, inject } from '@angular/core';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";
import { Router } from '@angular/router';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent { 
  router = inject(Router);
  storageSrv = inject(StorageService);

  
  logout = () => {
    this.storageSrv.logout();
    this.router.navigate(['/auth/login']);
  };
}
