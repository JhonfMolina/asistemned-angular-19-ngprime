export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  expires_at: string | null;
  status: string;
  data?: EntityStorage;
  perfil?: Profile;
}

export interface EntityStorage {
  id: string;
  razon_social: string;
  slug: string;
  sector: string;
  utilidad_tipo_identificacion_id: string;
  identificacion: string;
  utilidad_departamento_id: string;
  nombre_departamento: string;
  utilidad_ciudad_id: string;
  nombre_ciudad: string;
  direccion: string;
  telefonos: string;
  descripcion: string;
  estado: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  status: string;
}
