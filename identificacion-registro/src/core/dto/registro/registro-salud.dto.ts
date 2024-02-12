import { GrupoSanguineo } from "../../entities/grupo-sanguineo.entity";
import { LimitacionIdiomatica } from "src/core/entities/limitacion-idiomatica.entity";
import { SaludFisica } from "src/core/entities/salud-fisica.entity";
import { SaludMental } from "src/core/entities/salud-mental.entity";
import { Vacuna } from "../../entities/vacuna.entity";

export class RegistroSaludDTO{
  id_persona:number;
  tieneAfeccionADrogras:boolean;
  tieneAfeccionADrogas_modificado:boolean;
  grupo_sanguineo:number;
  grupo_sanguineo_modificado:boolean;
  vacunas_recibidas:Array<{id:number, label:string}>;
  vacunas_recibidas_modificada:boolean;
  presion_arterial:number;
  presion_arterial_modificada:boolean;
  frecuencia_cardiaca:number;
  frecuencia_cardiaca_modificada:boolean;
  frecuencia_respiratoria:number;
  frecuencia_respiratoria_modificada:boolean;
  temperatura:number;
  temperatura_modificada:boolean;
  peso:number;
  peso_modificado:boolean;
  talla:number;
  talla_modificado:boolean;
  imc:number;
  imc_modificado:boolean;
  vdrl:boolean;
  vdrl_modificado:boolean;
  vih:boolean;
  vih_modificado:boolean;
  tb:boolean;
  tb_modificado:boolean;
  gestacion:boolean;
  gestacion_modificado:boolean;
  tiempo_gestacion:number;
  tiempo_gestacion_modificado:boolean;
  fecha_parto:Date;
  fecha_parto_modificada:boolean;
  discapacidad_fisica:string;
  discapacidad_modificada:boolean;
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
  necesitaInterprete:boolean;
  necesitaInterprete_modificado:boolean;
  tieneDificultadParaLeerYEscribir:boolean;
  tieneDificultadParaLeerYEscribir_modificado:boolean;
  saludMental:SaludMental;
  saludFisica:SaludFisica;
  limitacionesIdiomaticas:LimitacionIdiomatica;
}