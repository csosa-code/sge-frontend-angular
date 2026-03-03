import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-layout',
  imports: [ RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export default class AppLayoutComponent { }
