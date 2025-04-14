import { RolesPermisos } from './roles-permisos.interfaces';

export interface Roles {
  ma_entidad_id: string;
  nombre: string;
  permisos: RolesPermisos[];
  estado?: string;
}
