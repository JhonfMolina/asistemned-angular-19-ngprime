import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '@interfaces/util/response.models';

@Injectable({
  providedIn: 'root',
})
export class MedicalConsultationsService extends GlobalService {
  getlist(params: any) {
    return this._http.get<PaginatedApiResponse<any>>(
      `${this.apiUrl}/asistencial/ordenes-medicas/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<any>>(
      `${this.apiUrl}/asistencial/ordenes-medicas/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: any) {
    return this._http.post<ApiResponse<any>>(
      `${this.apiUrl}/asistencial/ordenes-medicas`,
      data
    );
  }

  public put(id: string, data: any) {
    return this._http.put<ApiResponse<any>>(
      `${this.apiUrl}/asistencial/ordenes-medicas/${id}`,
      data
    );
  }
}
