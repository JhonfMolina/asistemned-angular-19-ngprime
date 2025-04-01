import { inject, Injectable } from '@angular/core';
import { GlobalService } from '../util/global.service';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs';
import {
  AuthResponse,
  EntityStorage,
  Profile,
} from '@interfaces/auth/auth.interface';
import { environment } from '../../../../environments/environment';
import { EncryptionService } from '@services/util/encryption.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends GlobalService {
  private encryptionService = inject(EncryptionService);
  private _router = inject(Router);

  signIn(email: string, password: string): Observable<AuthResponse> {
    const url = `${this.apiUrl}/seguridad/login`;
    const body = { email, password };
    return this._http.post<AuthResponse>(url, body);
  }

  public getUserProfile() {
    return this._http.get<any>(
      `${this.apiUrl}/seguridad/users/search-profile?ma_entidad_id=${
        this.getEntityStorage.id || ''
      }`
    );
  }

  accountVerification(data: any) {
    return this._http.post<any>(`${this.apiUrl}/seguridad/verify`, data);
  }

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
      expires_at: resp.expires_at,
      success: resp.success,
      message: resp.message,
      status: resp.status,
      data: resp.data,
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

  get getEntityStorage(): EntityStorage {
    return this.encryptionService.getDataLocalStorage(
      environment.KEY_SESION_LOCAL_STORAGE,
      'data'
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
      'accountVerfication'
    );
  }
}
