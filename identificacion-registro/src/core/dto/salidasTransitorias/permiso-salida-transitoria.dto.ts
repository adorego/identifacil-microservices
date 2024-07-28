

export class SalidaTransitoriaDTO{
    numero_del_oficio:string;
    fecha_del_oficio:Date;
    ppl:number;
    hora_de_salida:Date;
    dias_de_salida:Array<number>;
    hora_de_llegada:Date;
    dias_de_llegada:Array<number>;
    estado:string;
    tiempo_de_permiso:number; //dias
    
}