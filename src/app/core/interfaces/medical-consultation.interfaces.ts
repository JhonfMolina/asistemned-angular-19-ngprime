export interface MedicalConsultation {
  id?: string;
  orden_medica_id?: string;
  orden_medica?: string;
  paciente_id?: string;
  paciente?: string;
  paciente_dni?: string;
  paciente_telefono?: string;
  paciente_email?: string;
  fecha_atencion?: string;
  hora_atencion?: string;
  motivo_consulta?: string;
  diagnostico?: string;
  tratamiento?: string;
  observaciones?: string;
}
