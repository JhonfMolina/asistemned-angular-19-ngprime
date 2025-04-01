export interface Entities {
  razon_social: string;
  sector: string;
  utilidad_tipo_identificacion_id: string;
  identificacion: number;
  utilidad_departamento_id: string;
  utilidad_ciudad_id: string;
  direccion: string;
  telefonos: string;
  descripcion: string;
  estado: string;
  modulos?: Array<string>;
}
