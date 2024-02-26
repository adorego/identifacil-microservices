import { DocumentoOrdenPrision } from "src/core/entities/documentos-ordenan-prision.entity";
import { IngresoAPrision } from "src/core/entities/ingreso-a-prision.entity";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity"


export class RespuestaFactoryDatosJudiciales{
    situacionJudicial:SituacionJudicial;
    ingresoAPrision:IngresoAPrision;
    oficioJudicialAGuardar:DocumentoOrdenPrision;
    resolucionMJAGuardar:DocumentoOrdenPrision;
}