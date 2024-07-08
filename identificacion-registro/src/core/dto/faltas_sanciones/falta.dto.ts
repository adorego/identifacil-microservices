

export class FaltaDTO{

    tipo_de_falta:number;

    fecha_y_hora_de_la_falta:Date;

    numero_de_resolucion:string;

    fecha_de_la_resolucion:Date;

    descripcion_de_la_falta:string;

    grado_de_falta:number;

    victima_de_la_falta:string;

    tipo_victima:number;

    ppl:number;

    sanciones_aplicadas:Array<number>
}