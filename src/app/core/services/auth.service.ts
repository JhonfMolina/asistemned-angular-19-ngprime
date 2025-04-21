import { Injectable } from '@angular/core';

import { AuthResponse, Login, Register } from '@interfaces/auth.interface';
import { GlobalService } from './util/global.service';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends GlobalService {
  login(data: Login): Observable<AuthResponse> {
    const url = `${this.apiUrl}/seguridad/login`;
    return this._http.post<AuthResponse>(url, data);
  }

  register(data: Register): Observable<any> {
    const url = `${this.apiUrl}/seguridad/register`;
    return this._http.post<any>(url, data);
  }

  getUserProfile() {
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
}
