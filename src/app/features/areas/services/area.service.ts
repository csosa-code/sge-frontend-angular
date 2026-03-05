import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from '../../../core/services/app-settings.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Area } from '../interfaces/area.interface';
import { ApiResponse } from '../../../core/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  readonly urlBase = inject(AppSettingsService).urlBase;
  readonly url = this.urlBase + 'areas';
  readonly http = inject(HttpClient);

  getAll(query?: any) {
    let options = {};
    if (query) {
      options = {
        params: new HttpParams()
          .set('page', query.pageIndex.toString())
          .set('pageSize', query.pageSize.toString())
          .set('sortActive', query.sortActive)
          .set('sortDirection', query.sortDirection)
          .set('filter', query.filter)
      };
    }

    return this.http.get<ApiResponse<Area[]>>(this.url);
  }

  getById(areaId: number) {
    return this.http.get<ApiResponse<Area>>(this.url + `/${ areaId }`);
  }

  set(data: Area) {
    return this.http.post<ApiResponse<Area>>(this.url, data);
  }

  update(data: Area, areaId: number) {
    return this.http.put<ApiResponse<Area>>(this.url + `/${ areaId }`, data);
  }
}
