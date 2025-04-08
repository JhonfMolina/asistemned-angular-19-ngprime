import { RolesPermisos } from "./roles-permisos.interfaces";

export interface Roles {
  ma_entidad_id: string;
  nombre: string;
  slug: string;
  estado: string;
  permisos: RolesPermisos[];
}
