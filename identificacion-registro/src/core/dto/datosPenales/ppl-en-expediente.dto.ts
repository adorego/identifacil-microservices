//import { hechoPunibleCausa } from "./expediente.dto";
interface hechoPunibleCausa{
    hecho_punible:number;
    causa_judicial:number;
}
interface DisminucionDePena{
    descripcion:string;
    fecha_recalculada:Date;
    documento:string;
}

export class PPLsEnExpedienteDTO{
    id_persona:number;
    condenado:boolean;
    hechosPuniblesCausas:Array<hechoPunibleCausa>;
    defensor:number;
    condena:{
        anhos:number;
        meses:number;
    };
    fecha_de_aprehension:Date;
    tiene_anhos_extra_por_medida_de_seguridad:boolean;
    anhos_extra_por_medida_de_seguridad:{
        anhos:number;
        meses:number;
    }
    sentencia_definitiva:string;
    fecha_sentencia_definitiva:Date;
    fecha_de_compurgamiento_inicial:Date;
    fecha_de_compurgamiento_recalculada:Array<DisminucionDePena>
  

}