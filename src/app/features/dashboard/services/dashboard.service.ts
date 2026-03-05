import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from '../../../core/services/app-settings.service';
import { ApiResponse } from '../../../core/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  readonly urlBase = inject(AppSettingsService).urlBase;
  readonly url = this.urlBase + 'dashboard';


  getDashboardSummary(){
    return  this.http.get<ApiResponse<any>>(this.url + '/summary');
  }

  getPayroll() {
    return this.http.get<ApiResponse<any>>(
      this.url + '/payroll'
    );
  }
}
