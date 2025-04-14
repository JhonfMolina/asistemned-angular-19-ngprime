import { Injectable } from '@angular/core';
import { GlobalService } from '@services/util/global.service';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '@interfaces/util/response.models';
import { Users } from '@interfaces/users.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends GlobalService {
  getlist(params: any) {
    return this._http.get<PaginatedApiResponse<Users>>(
      `${this.apiUrl}/seguridad/users/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<Users>>(
      `${this.apiUrl}/seguridad/users/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  // Se obtienen todos los acl de los roles de un usuario
  public getByIdUserRole(params: any) {
    return this._http.get<ApiResponse<Users>>(
      `${this.apiUrl}/seguridad/users/roles/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: Users) {
    return this._http.post<ApiResponse<Users>>(
      `${this.apiUrl}/seguridad/users`,
      data
    );
  }

  public put(id: string, data: Users) {
    return this._http.put<ApiResponse<Users>>(
      `${this.apiUrl}/seguridad/users/${id}`,
      data
    );
  }
}
