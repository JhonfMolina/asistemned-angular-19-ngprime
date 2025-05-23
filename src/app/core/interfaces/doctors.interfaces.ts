export interface Doctors {
  ma_entidad_id: string;
  utilidad_tipo_identificacion_id: string;
  identificacion: string;
  rethus: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_nacimiento: Date;
  sexo: string;
  utilidad_departamento_id: string;
  utilidad_ciudad_id: string;
  direccion: string;
  contactos: string;
  correo: string;
  universidad: string;
  user_id: number;
  estado: string;
  id?: string;
  utilidad_tipo_identificacion_nombre?: string;
  utilidad_tipo_identificacion_abreviatura?: string;
  nombre_completo?: string;
  utilidad_departamento_nombre?: string;
  utilidad_ciudad_nombre?: string;
  registro_id?: null;
}
