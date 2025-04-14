import { Entities } from '@interfaces/entities.interfaces';

export interface AuthResponse {
  message: string;
  token: string;
  expires_at: string | null;
  status: string;
  statusCode: number;
  succes: boolean;
  perfil?: Profile;
  entidad?: Entities;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  status: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  identificacion: string;
  email: string;
  password: string;
  password_confirmation: string;
}
