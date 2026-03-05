import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderService } from '../../../../core/services/page-header.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  showNotifications = signal(false);
  header = inject(PageHeaderService);

  toggleNotifications() {
    this.showNotifications.update(v => !v);
  }
 }
