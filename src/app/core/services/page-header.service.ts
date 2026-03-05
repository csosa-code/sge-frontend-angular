import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageHeaderService {

  title = signal<string>('');
  subtitle = signal<string>('');

  set(title: string, subtitle: string) {
    this.title.set(title);
    this.subtitle.set(subtitle);
  }

}
