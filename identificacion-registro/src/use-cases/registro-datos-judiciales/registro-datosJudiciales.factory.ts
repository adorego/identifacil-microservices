import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { DocumentoOrdenPrision } from "src/core/entities/documentos-ordenan-prision.entity";
import { FileService } from "src/framework/lib/files.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { IngresoAPrision } from "src/core/entities/ingreso-a-prision.entity";
import { RegistroDatosJudicialesDTO } from "src/core/dto/registro/registro-datos-judiciales.dto";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";

@Injectable()
export class RegistroDatosJudicialesFactory{
  private readonly logger = new Logger('RegistroDatosJudicialesFactory');
  constructor(
    private dataService:IDataService,
    private fileService:FileService,
    
  ){

  }

  async generar_datos_judiciales(registroDatosJudiciales:RegistroDatosJudicialesDTO, oficio_judicial:Express.Multer.File, resolucion:Express.Multer.File):Promise<SituacionJudicial>{
    if(!registroDatosJudiciales.id_persona){
      throw new HttpException('No se envió el id de la persona', HttpStatus.BAD_REQUEST);
    }
    const personaEncontrada = await this.dataService.persona.get(registroDatosJudiciales.id_persona);
    if(!personaEncontrada){
       throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
    } 
    
    const establecimientoPenitenciario = await this.dataService.establecimientoPenitenciario.get(registroDatosJudiciales.establecimientoPenitenciario);

    if(!establecimientoPenitenciario){
      throw new HttpException("No existe el establecimiento penitenciario", HttpStatus.BAD_REQUEST);
    }

    const causaJudicial = await this.dataService.causas.get(registroDatosJudiciales.causa);
    if(!causaJudicial){
      throw new HttpException("No existe la causa judicial", HttpStatus.BAD_REQUEST);
    }
    
    let situacionJudicial = new SituacionJudicial();
    

    //Generar un registro de Situacion Judicial
    situacionJudicial.primera_vez_en_prision = registroDatosJudiciales.primeraVezEnPrision ;
    situacionJudicial.cantidad_de_veces_que_ingreso = registroDatosJudiciales.cantidadDeIngresos;
    
    const ingresoAPrision = new IngresoAPrision();
    ingresoAPrision.fecha_ingreso = new Date();
    ingresoAPrision.establecimiento_penitenciario = establecimientoPenitenciario;
    ingresoAPrision.causa = causaJudicial;
    if(ingresoAPrision.causa.condenado){
      ingresoAPrision.fecha_de_salida.setFullYear(ingresoAPrision.fecha_ingreso.getFullYear() + causaJudicial.condena.anhos);
    }else{
      ingresoAPrision.fecha_de_salida = null
    }

    const oficioJudicialAGuardar = new DocumentoOrdenPrision();
    oficioJudicialAGuardar.causa = causaJudicial;
    oficioJudicialAGuardar.fecha = new Date(registroDatosJudiciales.oficioJudicial.fechaDeDocumento);
    oficioJudicialAGuardar.numero_documento = registroDatosJudiciales.oficioJudicial.numeroDeDocumento;
    oficioJudicialAGuardar.ruta = await this.fileService.almacenar_archivo(oficio_judicial,`oficioJudicial_${registroDatosJudiciales.oficioJudicial.fechaDeDocumento}_${registroDatosJudiciales.id_persona}`)
    const oficioJudicialGuardado = await this.dataService.documentoOrdenPrision.create(oficioJudicialAGuardar);


    const resolucionMJAGuardar = new DocumentoOrdenPrision();
    resolucionMJAGuardar.causa = causaJudicial;
    resolucionMJAGuardar.fecha = new Date(registroDatosJudiciales.resolucion.fechaDeDocumento);
    resolucionMJAGuardar.numero_documento = registroDatosJudiciales.resolucion.numeroDeDocumento;
    resolucionMJAGuardar.ruta = await this.fileService.almacenar_archivo(resolucion,`resolucionMJ/DGEP_${registroDatosJudiciales.resolucion.fechaDeDocumento}_${registroDatosJudiciales.id_persona}`)
    const resolucionMJGuardada = await this.dataService.documentoOrdenPrision.create(resolucionMJAGuardar);
    
    ingresoAPrision.documento_que_ordenan_prision.push(oficioJudicialGuardado);
    ingresoAPrision.documento_que_ordenan_prision.push(resolucionMJGuardada);
    
    //Guardar ingresoAPrision
    const ingresoAPrisionGuardado = this.dataService.ingresoAPrision.create(ingresoAPrision);

    //Actualizar causas
    // .where("causa.persona.numeroDeIDentificacion = :numeroDeIdentificacion", {numeroDeIdentificacion})
          
    const causas:Array<CausaJudicial> = await this.dataService.causas.getAllCausasByNumeroDeIdentificacion(personaEncontrada.numero_identificacion);
    situacionJudicial.persona = personaEncontrada;
    situacionJudicial.causas = causas;
    
    return await this.dataService.situacionJudicial.create(situacionJudicial);
  }
}