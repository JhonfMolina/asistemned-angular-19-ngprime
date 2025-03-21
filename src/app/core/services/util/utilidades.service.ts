import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class UtilidadesService extends GlobalService {
  public getListadoTipoIdentificacion(params: any) {
    return this._http.get<any>(
      this.apiUrl + `/tipo-identificaciones/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getListadoDepartamentos(params: any) {
    return this._http.get<any>(this.apiUrl + `/departamentos/index-where`, {
      params: this.setHttpParams(params),
    });
  }

  public getListadoCiudadesPorDepartamento(params: any) {
    return this._http.get<any>(this.apiUrl + `/ciudades/index-where`, {
      params: this.setHttpParams(params),
    });
  }
}
