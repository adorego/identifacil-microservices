import { Persona } from "./persona.entity";

export class Seguridad{
  id:number;
  persona:Persona;
  es_riesgo_para_personal:boolean;
  riesgo_personal:string;
  es_riesgo_para_otros_reclusos:boolean;
  riesgo_para_otros_reclusos:string;
  tiene_riesgo_de_ser_lesionado_por_otros_reclusos:boolean;
  riesgo_de_ser_lesionado_por_otros_reclusos:string;
  constituye_riesgo_de_danar_propiedad:boolean;
  riesgo_de_danar_propiedad:string;
  es_miembro_de_grupo_que_es_amenaza_para_la_seguridad:boolean;
  miembro_de_grupo_que_es_amenaza_para_la_seguridad:string;
  tiene_entrenamiento_militar_previo:boolean;
  entrenamiento_militar_previo:string;
  era_funcionario_publico:boolean;
  cargo_funcionario_publico:string;

}