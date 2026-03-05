import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.error && typeof error.error === 'object') {
        return of(new HttpResponse({ body: error.error as ApiResponse<any>, status: error.status }));
      }

      const fallbackResponse: ApiResponse<null> = {
        status: false,
        message: 'Error de conexión con el servidor.',
        data: null
      };

      return of(new HttpResponse({ body: fallbackResponse, status: error.status || 0 }));
    })

  );
};