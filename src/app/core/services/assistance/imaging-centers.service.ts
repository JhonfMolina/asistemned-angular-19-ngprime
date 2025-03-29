import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import { ApiResponse } from '@interfaces/util/response.models';
import { ImagingCenters } from '@interfaces/assistance/imaging-centers.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ImagingCentersService extends GlobalService {
  getlist(params: any) {
    return this._http.get<ApiResponse<ImagingCenters[]>>(
      `${this.apiUrl}/asistencial/centro-imagenes/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<ImagingCenters>>(
      `${this.apiUrl}/asistencial/centro-imagenes/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: ImagingCenters) {
    return this._http.post<ApiResponse<ImagingCenters>>(
      `${this.apiUrl}/asistencial/centro-imagenes`,
      data
    );
  }

  public put(id: string, data: ImagingCenters) {
    return this._http.put<ApiResponse<ImagingCenters>>(
      `${this.apiUrl}/asistencial/centro-imagenes/${id}`,
      data
    );
  }
}
