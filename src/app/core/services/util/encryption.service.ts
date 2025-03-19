import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
type StorageObjectTypes =
  | 'token'
  | 'expires_at'
  | 'success'
  | 'message'
  | 'status'
  | 'data'
  | 'entidad'
  | 'perfil'
  | 'suscripcion'
  | 'accountVerfication';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private secretKey = environment.KEY_ECRYPT;

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  getDataLocalStorage(storage: string, obj?: StorageObjectTypes) {
    const getDataStorage = localStorage.getItem(storage)!;

    if (!getDataStorage) return false;
    if (!obj) return JSON.parse(getDataStorage);

    if (environment.ENCRYPT) {
      const decryptStorage = this.decrypt(getDataStorage);
      const dataCifrada: any = JSON.parse(decryptStorage);
      return dataCifrada[obj];
    } else {
      const localStorageData: any = JSON.parse(getDataStorage);
      return localStorageData[obj];
    }
  }
}
