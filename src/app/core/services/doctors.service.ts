import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '@interfaces/util/response.models';
import { Doctors } from '@interfaces/doctors.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService extends GlobalService {
  getlist(params: any) {
    return this._http.get<PaginatedApiResponse<Doctors>>(
      `${this.apiUrl}/asistencial/medicos/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<Doctors>>(
      `${this.apiUrl}/asistencial/medicos/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: Doctors) {
    return this._http.post<ApiResponse<Doctors>>(
      `${this.apiUrl}/asistencial/medicos`,
      data
    );
  }

  public put(id: string, data: Doctors) {
    return this._http.put<ApiResponse<Doctors>>(
      `${this.apiUrl}/asistencial/medicos/${id}`,
      data
    );
  }
}
