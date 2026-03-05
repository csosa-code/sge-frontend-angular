import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  readonly urlBase = environment.urlBase;
  readonly appProps = environment.appProps;
}
