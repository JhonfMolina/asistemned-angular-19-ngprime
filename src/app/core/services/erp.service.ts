import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '@interfaces/util/response.models';
import { Erp } from '@interfaces/erp.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ErpService extends GlobalService {
  getlist(params: any) {
    return this._http.get<PaginatedApiResponse<Erp>>(
      `${this.apiUrl}/admin/clientes/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<Erp>>(
      `${this.apiUrl}/admin/clientes/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: Erp) {
    return this._http.post<ApiResponse<Erp>>(
      `${this.apiUrl}/admin/clientes`,
      data
    );
  }

  public put(id: string, data: Erp) {
    return this._http.put<ApiResponse<Erp>>(
      `${this.apiUrl}/admin/clientes/${id}`,
      data
    );
  }
}
