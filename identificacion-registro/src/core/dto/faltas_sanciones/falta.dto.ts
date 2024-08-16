
export interface Victima{
    nombre:string;
    apellido:string;
    ci:string;
}

export class FaltaDTO{

    ppl:number;

    fecha_y_hora_de_la_falta:string;

    numero_de_resolucion:string;

    fecha_de_resolucion:Date;

    descripcion_de_la_falta:string;

    grado_de_falta:number;

    victimas_de_la_falta:Array<Victima>;

    tipos_de_victimas:Array<number>;

    sanciones_aplicadas:Array<number>;

    tipo_de_falta:number;
}