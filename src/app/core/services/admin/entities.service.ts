import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '@interfaces/util/response.models';
import { Entities } from '@interfaces/admin/entities.interfaces';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService extends GlobalService {
  getlist(params: any) {
    return this._http.get<PaginatedApiResponse<Entities>>(
      `${this.apiUrl}/admin/clientes/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<Entities>>(
      `${this.apiUrl}/admin/clientes/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: Entities) {
    return this._http.post<ApiResponse<Entities>>(
      `${this.apiUrl}/admin/clientes`,
      data
    );
  }

  public put(id: string, data: Entities) {
    return this._http.put<ApiResponse<Entities>>(
      `${this.apiUrl}/admin/clientes/${id}`,
      data
    );
  }
}
