import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({ providedIn: 'root' })
export class HighZIndexOverlayContainer extends OverlayContainer {
  protected override _createContainer(): void {
    const container = document.createElement('div');
    container.classList.add('cdk-overlay-container');
    container.style.zIndex = '1000';
    document.body.appendChild(container);
    this._containerElement = container;
  }
}