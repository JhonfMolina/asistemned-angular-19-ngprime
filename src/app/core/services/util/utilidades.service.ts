import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { ApiResponse } from '@interfaces/util/response.models';
import { City } from '@interfaces/util/city.interfaces';
import { Department } from '@interfaces/util/department.interfaces';
import { IdentificationType } from '@interfaces/util/identification-type.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UtilidadesService extends GlobalService {
  public getListadoTipoIdentificacion(params: any) {
    return this._http.get<ApiResponse<IdentificationType[]>>(
      this.apiUrl + `/tipo-identificaciones/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getListadoDepartamentos(params: any) {
    return this._http.get<ApiResponse<Department[]>>(
      this.apiUrl + `/departamentos/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getListadoCiudadesPorDepartamento(params: any) {
    return this._http.get<ApiResponse<City[]>>(
      this.apiUrl + `/ciudades/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }
}
