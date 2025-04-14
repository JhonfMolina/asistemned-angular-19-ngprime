import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '@interfaces/util/response.models';
import { Patients } from '@interfaces/patients.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PatientsService extends GlobalService {
  getlist(params: any) {
    return this._http.get<PaginatedApiResponse<Patients>>(
      `${this.apiUrl}/asistencial/pacientes/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<Patients>>(
      `${this.apiUrl}/asistencial/pacientes/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: Patients) {
    return this._http.post<ApiResponse<Patients>>(
      `${this.apiUrl}/asistencial/pacientes`,
      data
    );
  }

  public put(id: string, data: Patients) {
    return this._http.put<ApiResponse<Patients>>(
      `${this.apiUrl}/asistencial/pacientes/${id}`,
      data
    );
  }
}
