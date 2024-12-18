import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { DocumentoOrdenPrision } from "src/core/entities/documentos-ordenan-prision.entity";
import { FileService } from "src/framework/lib/files.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { IngresoAPrision } from "src/core/entities/ingreso-a-prision.entity";
import { RegistroDatosJudicialesDTO } from "src/core/dto/registro/registro-datos-judiciales.dto";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";
import { RespuestaFactoryDatosJudiciales } from "src/core/dto/registro_datos_judiciales/respuesta-factory-datosJudiciales.dto";
import { error } from "console";

@Injectable()
export class RegistroDatosJudicialesFactory{
  private readonly logger = new Logger('RegistroDatosJudicialesFactory');
  constructor(
    private dataService:IDataService,
    private fileService:FileService,
    
  ){

  }

  async generar_datos_judiciales(registroDatosJudicialesDTO:RegistroDatosJudicialesDTO, oficio_judicial:Express.Multer.File, resolucion:Express.Multer.File):Promise<RespuestaFactoryDatosJudiciales>{
   
    
    if(!registroDatosJudicialesDTO.id_persona){
      throw new HttpException('No se envió el id de la persona', HttpStatus.BAD_REQUEST);
    }
    const personaEncontrada = await this.dataService.persona.get(registroDatosJudicialesDTO.id_persona);
    if(!personaEncontrada){
       throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
    } 

    if(personaEncontrada.situacionJudicial){
      throw new HttpException('Ya existe un registro de Situacion Judicial', HttpStatus.BAD_REQUEST);
    }
    
    if(!registroDatosJudicialesDTO.oficioJudicial_numeroDeDocumento || !registroDatosJudicialesDTO.oficioJudicial_fechaDeDocumento){
      throw new HttpException('El oficio judicial debe tener numero de documento y fecha', HttpStatus.BAD_REQUEST);
    }

    if(!registroDatosJudicialesDTO.resolucion_numeroDeDocumento || !registroDatosJudicialesDTO.resolucion_fechaDeDocumento){
      throw new HttpException('La resolución judicial debe tener un numero de documento y una fecha', HttpStatus.BAD_REQUEST);
    }

    
    if(!registroDatosJudicialesDTO.expediente_numeroDeDocumento || !registroDatosJudicialesDTO.expediente_fechaDeDocumento){
      throw new HttpException('El expediente debe tener numero de documento y fecha', HttpStatus.BAD_REQUEST);
    }

    const establecimientoPenitenciario = await this.dataService.establecimientoPenitenciario.get(registroDatosJudicialesDTO.establecimientoPenitenciario);

    if(!establecimientoPenitenciario){
      throw new HttpException("No existe el establecimiento penitenciario", HttpStatus.BAD_REQUEST);
    }

    const expedienteJudicial = await this.dataService.expediente.get(registroDatosJudicialesDTO.expediente_id);
    if(!expedienteJudicial){
      throw new HttpException("No existe el expediente judicial", HttpStatus.BAD_REQUEST);
    }
    
    

    let situacionJudicial = new SituacionJudicial();
    

    //Generar un registro de Situacion Judicial
    situacionJudicial.primera_vez_en_prision = registroDatosJudicialesDTO.primeraVezEnPrision ;
    situacionJudicial.cantidad_de_veces_que_ingreso = registroDatosJudicialesDTO.cantidadDeIngresos;
    situacionJudicial.expediente_fecha_de_documento = registroDatosJudicialesDTO.expediente_fechaDeDocumento;
    situacionJudicial.expediente_numero_de_documento = registroDatosJudicialesDTO.expediente_numeroDeDocumento;
    situacionJudicial.caratula = registroDatosJudicialesDTO.caratula;
    situacionJudicial.sentencia_definitiva = registroDatosJudicialesDTO.sentenciaDefinitiva;
    
    
    
    const ingresoAPrision = new IngresoAPrision();
    ingresoAPrision.fecha_ingreso = registroDatosJudicialesDTO.fecha_ingreso_a_establecimiento ? registroDatosJudicialesDTO.fecha_ingreso_a_establecimiento : new Date();
    //ingresoAPrision.establecimiento_penitenciario = establecimientoPenitenciario;
    ingresoAPrision.expedienteJudicial = expedienteJudicial;
    // if(ingresoAPrision.expedienteJudicial.condenado){
    //   ingresoAPrision.fecha_de_salida = expedienteJudicial.fecha_de_compurgamiento_inicial;
    // }else{
    //   ingresoAPrision.fecha_de_salida = null
    // }

    const oficioJudicialAGuardar = new DocumentoOrdenPrision();
    oficioJudicialAGuardar.causa = expedienteJudicial;
    oficioJudicialAGuardar.fecha = new Date(registroDatosJudicialesDTO.oficioJudicial_fechaDeDocumento);
    oficioJudicialAGuardar.numero_documento = registroDatosJudicialesDTO.oficioJudicial_numeroDeDocumento;
    oficioJudicialAGuardar.ruta = await this.fileService.almacenar_archivo(oficio_judicial,`oficioJudicial_${registroDatosJudicialesDTO.id_persona}`)
    oficioJudicialAGuardar.tipo = "oficio judicial";
    

    const resolucionMJAGuardar = new DocumentoOrdenPrision();
    resolucionMJAGuardar.causa = expedienteJudicial;
    resolucionMJAGuardar.fecha = new Date(registroDatosJudicialesDTO.resolucion_fechaDeDocumento);
    resolucionMJAGuardar.numero_documento = registroDatosJudicialesDTO.resolucion_numeroDeDocumento;
    resolucionMJAGuardar.ruta = await this.fileService.almacenar_archivo(resolucion,`DGEP_${registroDatosJudicialesDTO.id_persona}`)
    resolucionMJAGuardar.tipo = "resolucion MJ";
    


    
    
    
    
    return{
      situacionJudicial:situacionJudicial,
      ingresoAPrision:ingresoAPrision,
      oficioJudicialAGuardar:oficioJudicialAGuardar,
      resolucionMJAGuardar:resolucionMJAGuardar,
      persona:personaEncontrada,
      establecimiento:establecimientoPenitenciario

    }
    
  }

  async generar_datos_judiciales_para_actualizar(id:number, registroDatosJudicialesDTO:RegistroDatosJudicialesDTO, oficio_judicial:Express.Multer.File, resolucion:Express.Multer.File):Promise<RespuestaFactoryDatosJudiciales>{

    if(!id){
      throw new HttpException('El id del registro judicial es invalido', HttpStatus.BAD_REQUEST);
    }
    let situacionJudicial:SituacionJudicial = await  this.dataService.situacionJudicial.get(id);

    if(!situacionJudicial){
      throw new HttpException('El registro judicial enviado es invalido', HttpStatus.BAD_REQUEST);
    }
    if(!registroDatosJudicialesDTO.id_persona){
      throw new HttpException('No se envió el id de la persona', HttpStatus.BAD_REQUEST);
    }
    const personaEncontrada = await this.dataService.persona.get(registroDatosJudicialesDTO.id_persona);
    if(!personaEncontrada){
       throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
    } 
    
    if(!registroDatosJudicialesDTO.oficioJudicial_numeroDeDocumento || !registroDatosJudicialesDTO.oficioJudicial_fechaDeDocumento){
      throw new HttpException('El oficio judicial debe tener numero de documento y fecha', HttpStatus.BAD_REQUEST);
    }

    if(!registroDatosJudicialesDTO.resolucion_numeroDeDocumento || !registroDatosJudicialesDTO.resolucion_fechaDeDocumento){
      throw new HttpException('La resolución judicial debe tener un numero de documento y una fecha', HttpStatus.BAD_REQUEST);
    }

    
    if(!registroDatosJudicialesDTO.expediente_numeroDeDocumento || !registroDatosJudicialesDTO.expediente_fechaDeDocumento){
      throw new HttpException('El expediente debe tener numero de documento y fecha', HttpStatus.BAD_REQUEST);
    }

    const establecimientoPenitenciario = await this.dataService.establecimientoPenitenciario.get(registroDatosJudicialesDTO.establecimientoPenitenciario);

    if(!establecimientoPenitenciario){
      throw new HttpException("No existe el establecimiento penitenciario", HttpStatus.BAD_REQUEST);
    }

    const expedienteJudicial = await this.dataService.expediente.get(registroDatosJudicialesDTO.expediente_id);
    if(!expedienteJudicial){
      throw new HttpException("No existe la causa judicial", HttpStatus.BAD_REQUEST);
    }

    situacionJudicial.primera_vez_en_prision = registroDatosJudicialesDTO.primeraVezEnPrision ;
    situacionJudicial.cantidad_de_veces_que_ingreso = registroDatosJudicialesDTO.cantidadDeIngresos;
    

    
    const ingresoAPrision = new IngresoAPrision();
    ingresoAPrision.fecha_ingreso = registroDatosJudicialesDTO.fecha_ingreso_a_establecimiento;
    ingresoAPrision.establecimiento_penitenciario = establecimientoPenitenciario;
    ingresoAPrision.expedienteJudicial = expedienteJudicial;
    // if(ingresoAPrision.expedienteJudicial.condenado){
    //   ingresoAPrision.fecha_de_salida = expedienteJudicial.fecha_de_compurgamiento_inicial;
    // }else{
    //   ingresoAPrision.fecha_de_salida = null
    // }

    const oficioJudicialAGuardar = new DocumentoOrdenPrision();
    oficioJudicialAGuardar.causa = expedienteJudicial;
    oficioJudicialAGuardar.fecha = new Date(registroDatosJudicialesDTO.oficioJudicial_fechaDeDocumento);
    oficioJudicialAGuardar.numero_documento = registroDatosJudicialesDTO.oficioJudicial_numeroDeDocumento;
    oficioJudicialAGuardar.ruta = await this.fileService.almacenar_archivo(oficio_judicial,`oficioJudicial_${registroDatosJudicialesDTO.id_persona}`)
    oficioJudicialAGuardar.tipo = "oficio judicial";
    

    const resolucionMJAGuardar = new DocumentoOrdenPrision();
    resolucionMJAGuardar.causa = expedienteJudicial;
    resolucionMJAGuardar.fecha = new Date(registroDatosJudicialesDTO.resolucion_fechaDeDocumento);
    resolucionMJAGuardar.numero_documento = registroDatosJudicialesDTO.resolucion_numeroDeDocumento;
    resolucionMJAGuardar.ruta = await this.fileService.almacenar_archivo(resolucion,`DGEP_${registroDatosJudicialesDTO.id_persona}`)
    resolucionMJAGuardar.tipo = "resolucion MJ";
    

    

    
    
    
    
    return{
      situacionJudicial:situacionJudicial,
      ingresoAPrision:ingresoAPrision,
      oficioJudicialAGuardar:oficioJudicialAGuardar,
      resolucionMJAGuardar:resolucionMJAGuardar,
      persona:personaEncontrada,
      establecimiento:establecimientoPenitenciario

    }
    

  }
}