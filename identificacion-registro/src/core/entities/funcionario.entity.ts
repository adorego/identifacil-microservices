import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { MedidaDeFuerza } from "./medida-de-fuerza.entity";



export class Funcionario{
    id:number;
    nombre:string;
    apellido:string;
    cedula:string;
    establecimiento:EstablecimientoPenitenciario;
    medidas_de_fuerza:Array<MedidaDeFuerza>;

}