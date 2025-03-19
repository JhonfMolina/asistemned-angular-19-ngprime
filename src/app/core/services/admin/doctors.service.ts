import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GlobalService } from '@services/util/global.service';
import { ApiResponse } from '@interfaces/util/response.models';
import { Doctors } from '@interfaces/admin/doctors.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService extends GlobalService {
  getlist(params: any) {
    return this._http
      .get<ApiResponse<Doctors[]>>(
        `${this.apiUrl}/asistencial/medicos/index-where`,
        {
          params: this._setHttpRequest.setHttpParams(params),
        }
      )
      .pipe(
        map((res) => {
          return res.data.map((item) => {
            return {
              ...item,
              nombre_completo: `${item.primer_nombre} ${item.primer_apellido} ${item.segundo_apellido}`,
            };
          });
        })
      );
  }

  public getId(params: any) {
    return this._http.get<ApiResponse<Doctors>>(
      `${this.apiUrl}/asistencial/medicos/search-where`,
      {
        params: this._setHttpRequest.setHttpParams(params),
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
