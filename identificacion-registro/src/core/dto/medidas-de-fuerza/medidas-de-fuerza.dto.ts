
export class MedidasDeFuerzaDTO{
    ppl:number;
    tipo_de_medida_de_fuerza:number;
    fecha_de_inicio:Date;
    hora_inicio:Date;
    fecha_de_fin:Date;
    hora_fin:Date;
    motivo:number;
    estado:string;
    exigencias:Array<string>;
    negociadores:Array<number>;
}