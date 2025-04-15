export interface Users {
  ma_entidad_id: string;
  name: string;
  identificacion: string;
  email: string;
  password: string;
  password_confirmation: string;
  status: string;
  acl_roles: string[];
}

export interface UserRole {
  id: string;
  name: string;
  email: string;
  ma_entidad_id: string;
  identificacion: string;
  status: string;
  acl: ACL[];
}

export interface ACL {
  acl_user_id: string;
  acl_rol_id: string;
  acl_rol_nombre: ACLRolNombre;
  acl_rol_slug: ACLRolSlug;
  acl_permiso_id: string;
  acl_rol_per_acciones: ACLRolPerAcciones;
  acl_per_ma_entidad_id: string;
  acl_per_constante: string;
  acl_per_modulo: ACLPerModulo;
  acl_per_recurso: string;
}

export enum ACLPerModulo {
  Administracion = 'administracion',
  Asistencial = 'asistencial',
  Libreria = 'libreria',
  Seguridad = 'seguridad',
}

export enum ACLRolNombre {
  Visit = 'VISIT',
}

export enum ACLRolPerAcciones {
  ListarVer = '["listar", "ver"]',
  Ver = '["ver"]',
}

export enum ACLRolSlug {
  Visit = 'visit',
}
