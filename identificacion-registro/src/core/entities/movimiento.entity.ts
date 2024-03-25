import { Chofer } from "./chofer.entity";
import { Custodio } from "./custodio.entity";
import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { Funcionario } from "./funcionario.entity";
import { MedidaDeSeguridad } from "./medida-de-seguridad.entity";
import { MotivoDeTraslado } from "./motivo-traslado.entity";
import { Ppl } from "./ppl.entity";
import { Vehiculo } from "./vehiculo.entity";


export class Movimiento{
    id:number;
    numero_de_documento:string;
    fecha_de_documento:Date;
    fecha_de_traslado:Date;
    autorizado_por:Funcionario;
    motivo_de_traslado:MotivoDeTraslado;
    medidas_de_seguridad:Array<MedidaDeSeguridad>;
    descripcion_motivo:string;
    custodios:Array<Custodio>;
    chofer:Chofer;
    vehiculo:Vehiculo;
    origenTraslado:EstablecimientoPenitenciario;
    destinoTraslado:EstablecimientoPenitenciario;
    documentoAdjunto:string;
    ppls:Array<Ppl>
}