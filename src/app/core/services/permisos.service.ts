import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '@interfaces/util/response.models';
import { Permisos } from '@interfaces/permisos.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PermisosService extends GlobalService {
  getlist(params: any) {
    return this._http.get<ApiResponse<any>>(
      `${this.apiUrl}/seguridad/permisos/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<Permisos>>(
      `${this.apiUrl}/seguridad/permisos/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: Permisos) {
    return this._http.post<ApiResponse<Permisos>>(
      `${this.apiUrl}/seguridad/permisos`,
      data
    );
  }

  public put(id: string, data: Permisos) {
    return this._http.put<ApiResponse<Permisos>>(
      `${this.apiUrl}/seguridad/permisos/${id}`,
      data
    );
  }
}
