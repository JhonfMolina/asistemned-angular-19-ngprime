import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import { ApiResponse } from '@interfaces/util/response.models';
import { Laboratories } from '@interfaces/admin/laboratories.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LaboratoriesService extends GlobalService {
  getlist(params: any) {
    return this._http.get<ApiResponse<Laboratories[]>>(
      `${this.apiUrl}/asistencial/laboratorios/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<Laboratories>>(
      `${this.apiUrl}/asistencial/laboratorios/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: Laboratories) {
    return this._http.post<ApiResponse<Laboratories>>(
      `${this.apiUrl}/asistencial/laboratorios`,
      data
    );
  }

  public put(id: string, data: Laboratories) {
    return this._http.put<ApiResponse<Laboratories>>(
      `${this.apiUrl}/asistencial/laboratorios/${id}`,
      data
    );
  }
}
