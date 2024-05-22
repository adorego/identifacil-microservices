import { MedidaDeFuerza } from "./medida-de-fuerza.entity";


export class RegistroMedico{
    id:number;
    fecha:Date;
    diagnostico:string;
    medida_de_fuerza:MedidaDeFuerza;
    archivo_registro_medico:string;
}