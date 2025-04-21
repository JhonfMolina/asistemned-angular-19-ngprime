import { inject, Injectable } from '@angular/core';

import { AuthResponse, Profile } from '@interfaces/auth.interface';
import { EncryptionService } from '@services/util/encryption.service';
import { Entities } from '@interfaces/entities.interfaces';
import { GlobalService } from './util/global.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService extends GlobalService {
  private encryptionService = inject(EncryptionService);

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

  get getPermissionsUser(): any {
    return this.encryptionService.getDataLocalStorage(
      environment.KEY_SESION_LOCAL_STORAGE,
      'permisos'
    );
  }

  get getAccountVerificationStorage(): any {
    return this.encryptionService.getDataLocalStorage(
      environment.KEY_SESION_LOCAL_STORAGE,
      'status'
    );
  }
}
