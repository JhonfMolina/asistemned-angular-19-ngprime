import { inject, Injectable } from '@angular/core';

import {
  AuthResponse,
  Login,
  Profile,
  Register,
} from '@interfaces/auth.interface';
import { EncryptionService } from '@services/util/encryption.service';
import { Router } from '@angular/router';
import { Entities } from '@interfaces/entities.interfaces';
import { GlobalService } from './util/global.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends GlobalService {
  private encryptionService = inject(EncryptionService);
  private _router = inject(Router);

  login(data: Login): Observable<AuthResponse> {
    const url = `${this.apiUrl}/seguridad/login`;
    return this._http.post<AuthResponse>(url, data);
  }

  register(data: Register): Observable<any> {
    const url = `${this.apiUrl}/seguridad/register`;
    return this._http.post<any>(url, data);
  }

  public getUserProfile() {
    return this._http.get<any>(
      `${this.apiUrl}/seguridad/users/search-profile?ma_entidad_id`
    );
  }

  accountVerification(data: any) {
    return this._http.post<any>(`${this.apiUrl}/seguridad/verify`, data);
  }

  resendCodeAccountVerification = () =>
    this._http.post<any>(`${this.apiUrl}/seguridad/email/resend`, {});

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.onSignUp();
      return throwError(() => 'No refresh token found');
    }
    return this._http
      .post(`${this.apiUrl}/seguridad/refresh-token`, { refreshToken })
      .pipe(
        map((res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          return res;
        }),
        catchError((error) => {
          this.onSignUp();
          return throwError(() => error);
        })
      );
  }

  onSignUp(): void {
    const url = `${this.apiUrl}/seguridad/logout`;
    this._http.post(url, {}).subscribe();
    localStorage.clear();
    location.reload();
  }

  public setAuthorizationToken(resp: any): void {
    const DataStorage: AuthResponse = {
      token: resp.token,
      succes: resp.success,
      message: resp.message,
      status: resp.status,
      statusCode: resp.statusCode,
      expires_at: resp.expires_at,
      entidad: resp.entidad,
    };
    const localStorageData = JSON.stringify(DataStorage);
    this.setLocalStorage(localStorageData);
  }

  private setLocalStorage(dataStorage: string) {
    if (environment.ENCRYPT) {
      const dataCifrada = this.encryptionService.encrypt(dataStorage);
      localStorage.setItem(environment.KEY_SESION_LOCAL_STORAGE, dataCifrada);
    } else {
      localStorage.setItem(environment.KEY_SESION_LOCAL_STORAGE, dataStorage);
    }
  }

  updateLocalStorage(addDataStorage: Partial<AuthResponse>): void {
    const currentDataStorage: any = this.getLocalStorage;
    if (currentDataStorage) {
      const updatedData = { ...currentDataStorage, ...addDataStorage };
      const updatedDataString = JSON.stringify(updatedData);
      this.setLocalStorage(updatedDataString);
    }
  }

  get getLocalStorage(): string | boolean {
    return this.encryptionService.getDataLocalStorage(
      environment.KEY_SESION_LOCAL_STORAGE
    );
  }

  get getAuthorizationToken(): string | boolean {
    return this.encryptionService.getDataLocalStorage(
      environment.KEY_SESION_LOCAL_STORAGE,
      'token'
    );
  }

  get getEntityStorage(): Entities {
    return this.encryptionService.getDataLocalStorage(
      environment.KEY_SESION_LOCAL_STORAGE,
      'entidad'
    );
  }

  get getUserProfileStorage(): Profile {
    return this.encryptionService.getDataLocalStorage(
      environment.KEY_SESION_LOCAL_STORAGE,
      'perfil'
    );
  }

  get getSubscriptionStorage(): any {
    return this.encryptionService.getDataLocalStorage(
      environment.KEY_SESION_LOCAL_STORAGE,
      'suscripcion'
    );
  }

  get getAccountVerificationStorage(): any {
    return this.encryptionService.getDataLocalStorage(
      environment.KEY_SESION_LOCAL_STORAGE,
      'status'
    );
  }
}
