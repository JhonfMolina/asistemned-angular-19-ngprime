import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from '../../../../environments/environment';
import { SetParamsHttpRequestService } from './setParamsHttpRequest.service';

type TypeKeyString<T> = {
  [key: string]: T;
};

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  readonly apiUrl = environment.apiUrl;
  readonly _refresh = new Subject<void>();
  readonly _http = inject(HttpClient);
  readonly _setHttpRequest = inject(SetParamsHttpRequestService);

  get refresh() {
    return this._refresh;
  }

  setHttpParams(params: TypeKeyString<any>): HttpParams {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return httpParams;
  }
}
