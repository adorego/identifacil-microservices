import { Concubino } from "src/core/entities/concubino.entity"
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { TipoIdentificacion } from "src/core/entities/tipo-identificacion.entity";


export class RespuestaConyugeFactoryDTO{
    concubino:Concubino;
    datosFamiliares:DatosFamiliares;
    ppl:Ppl;
    tipo_de_identificacion:TipoIdentificacion
}