import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from '../../../core/services/app-settings.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  readonly urlBase = inject(AppSettingsService).urlBase;
  readonly url = this.urlBase + 'user';
  readonly http = inject(HttpClient);

  
  login(data: any) {
    return this.http.post<ApiResponse<any>>(this.url + '/login', data);
  }

  register(data: any) {
    return this.http.post<ApiResponse<any>>(this.url + '/register', data);
  }

}
