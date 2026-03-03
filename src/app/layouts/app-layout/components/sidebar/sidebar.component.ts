import { Component, inject } from '@angular/core';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent { 
  router = inject(Router);

  
  logout = () => {
    this.router.navigate(['/auth/login']);
  };
}
