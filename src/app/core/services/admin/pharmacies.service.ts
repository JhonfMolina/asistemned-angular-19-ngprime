import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import { ApiResponse } from '@interfaces/util/response.models';
import { Pharmacies } from '@interfaces/admin/pharmacies.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PharmaciesService extends GlobalService {
  getlist(params: any) {
    return this._http.get<ApiResponse<Pharmacies[]>>(
      `${this.apiUrl}/asistencial/farmacias/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<Pharmacies>>(
      `${this.apiUrl}/asistencial/farmacias/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: Pharmacies) {
    return this._http.post<ApiResponse<Pharmacies>>(
      `${this.apiUrl}/asistencial/farmacias`,
      data
    );
  }

  public put(id: string, data: Pharmacies) {
    return this._http.put<ApiResponse<Pharmacies>>(
      `${this.apiUrl}/asistencial/farmacias/${id}`,
      data
    );
  }
}
