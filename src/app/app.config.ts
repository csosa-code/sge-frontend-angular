import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { OVERLAY_DEFAULT_CONFIG } from '@angular/cdk/overlay';
import { pendingRequestsInterceptor$ } from 'ng-http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        pendingRequestsInterceptor$,
        httpErrorInterceptor
      ])
    ),
    { provide: LOCALE_ID, useValue: 'es' },
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
    }),
    { 
      provide: OVERLAY_DEFAULT_CONFIG, 
      useValue: { usePopover: false } 
    }
  ]
};
