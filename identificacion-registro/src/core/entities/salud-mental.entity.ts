import { Persona } from "./persona.entity";

export class SaludMental{
  id:number;
  persona:Persona;
  sigue_tratamiento_mental:boolean;
  sigue_tratamiento_mental_modificado:boolean;
  tiene_antecedentes_de_lesiones_autoinflingidas:boolean;
  tiene_antecedentes_de_lesiones_autoinflingidas_modificado:boolean;
  ha_estado_internado_en_hospital_psiquiatrico:boolean;
  ha_estado_internado_en_hospital_psiquiatrico_modificado:boolean;
  reporta_abuso_de_droga_previo_al_ingreso:boolean;
  reporta_abuso_de_droga_previo_al_ingreso_modificado:boolean;
  medicacion_actual:Array<string>;
  medicacion_actual_modificada:boolean;
  tiene_afeccion_severa_por_estupefacientes:boolean;
  tiene_afeccion_severa_por_estupefaciente_modificado:boolean;
  
  
}