

export class MovimientoDTO{
    numero_de_documento:string;
    fecha_de_documento:Date;
    fecha_de_traslado:Date;
    autorizado_por:number;
    motivo_de_traslado:number;
    medidas_de_seguridad:Array<number>;
    descripcion_motivo:string;
    custodios:Array<number>;
    chofer:number;
    vehiculo:number;
    origenTraslado:number;
    destinoTraslado:number;
    documentoAdjunto:File;
    ppls:Array<number>


}