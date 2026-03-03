import { Component } from '@angular/core';
import { SidebarMenuItemComponent } from "../sidebar-menu-item/sidebar-menu-item.component";
import { SIDEBAR_NAVIGATION } from '../../navigation/sidebar-navigation';
import { SidebarNavigationItem } from '../../navigation/sidebar-navigation.interface';

@Component({
  selector: 'app-sidebar-menu',
  imports: [SidebarMenuItemComponent],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
})
export class SidebarMenuComponent { 

  menuItems: SidebarNavigationItem[] = SIDEBAR_NAVIGATION;
}
