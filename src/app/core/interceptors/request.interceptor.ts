import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { LoadingService } from '../services/util/loading.service';
import { inject } from '@angular/core';
import getCodeError from '../helpers/getCodeError';
import { NotificationService } from '../services/util/notificacion.service';

export const requestInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const _loadingService = inject(LoadingService);
  const _notificationService = inject(NotificationService);
  _loadingService.setLoading(true);
  return next(req).pipe(
    map((respuesta: HttpEvent<any>) => {
      if (respuesta instanceof HttpResponse) {
        if (respuesta.status == 200 && respuesta.body) {
          console.log(respuesta.body);
        }
        _loadingService.setLoading(false);
      }
      return respuesta;
    }),
    catchError((error: HttpErrorResponse) => {
      const ERROR_MSJ = getCodeError(error);
      console.log('Error en la petición', error);
      _notificationService.showError(ERROR_MSJ, error.error.message);
      return throwError(() => ERROR_MSJ);
    }),
    finalize(() => {
      _loadingService.setLoading(false);
    })
  );
};
