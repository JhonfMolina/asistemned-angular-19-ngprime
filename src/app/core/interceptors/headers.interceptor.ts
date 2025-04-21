import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const headersInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const _storageService = inject(StorageService);
  const token = _storageService.getAuthorizationToken;
  let headers = req.headers;
  const listUrlWithoutToken = ['login', 'register', 'ipify', 'i18n'];

  if (!headers.has('Content-Type')) {
    headers = headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  if (listUrlWithoutToken.find((item) => req.url.includes(item))) {
    return next(req).pipe(catchError((error) => throwError(() => error)));
  }
  const clonedRequest = req.clone({
    headers,
  });

  return next(clonedRequest);
};
