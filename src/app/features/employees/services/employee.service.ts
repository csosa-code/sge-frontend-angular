import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from '../../../core/services/app-settings.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from '../interfaces/employee.interface';
import { ApiResponse } from '../../../core/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly urlBase = inject(AppSettingsService).urlBase;
  readonly url = this.urlBase + 'employees';
  readonly http = inject(HttpClient);

  getAll(query?: any) {
    let options = {};
    if (query) {
      options = {
        params: new HttpParams()
          .set('page', query.page.toString())
          .set('pageSize', query.pageSize.toString())
          .set('sortActive', query.sortActive)
          .set('sortDirection', query.sortDirection)
          .set('filter', query.filter)
      };
    }

    return this.http.get<ApiResponse<any>>(this.url, options);
  }

  getById(employeeId: number) {
    return this.http.get<ApiResponse<Employee>>(this.url + `/${ employeeId }`);
  }

  set(data: Employee) {
    return this.http.post<ApiResponse<Employee>>(this.url, data);
  }

  update(data: Employee, employeeId: number) {
    return this.http.put<ApiResponse<Employee>>(this.url + `/${ employeeId }`, data);
  }

  activate(employeeId: number) {
    return this.http.put<ApiResponse<null>>(this.url + `/${ employeeId }/activate`, {});
  }

  deactivate(employeeId: number) {
    return this.http.put<ApiResponse<null>>(this.url + `/${ employeeId }/deactivate`, {});
  }
}
