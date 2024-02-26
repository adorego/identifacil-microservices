import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { DocumentoOrdenPrision } from "src/core/entities/documentos-ordenan-prision.entity";
import { FileService } from "src/framework/lib/files.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { IngresoAPrision } from "src/core/entities/ingreso-a-prision.entity";
import { RegistroDatosJudicialesDTO } from "src/core/dto/registro/registro-datos-judiciales.dto";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";
import { RespuestaFactoryDatosJudiciales } from "src/core/dto/registro_datos_judiciales/respuesta-factory-datosJudiciales.dto";

@Injectable()
export class RegistroDatosJudicialesFactory{
  private readonly logger = new Logger('RegistroDatosJudicialesFactory');
  constructor(
    private dataService:IDataService,
    private fileService:FileService,
    
  ){

  }

  async generar_datos_judiciales(registroDatosJudicialesDTO:RegistroDatosJudicialesDTO, oficio_judicial:Express.Multer.File, resolucion:Express.Multer.File):Promise<RespuestaFactoryDatosJudiciales>{
   
    console.log("Datos al ingreso del factory:", registroDatosJudicialesDTO);
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

    const causaJudicial = await this.dataService.causas.get(registroDatosJudicialesDTO.causa);
    if(!causaJudicial){
      throw new HttpException("No existe la causa judicial", HttpStatus.BAD_REQUEST);
    }
    
    console.log("Datos despues de las validaciones del factory:", registroDatosJudicialesDTO);
    let situacionJudicial = new SituacionJudicial();
    

    //Generar un registro de Situacion Judicial
    situacionJudicial.primera_vez_en_prision = registroDatosJudicialesDTO.primeraVezEnPrision ;
    situacionJudicial.cantidad_de_veces_que_ingreso = registroDatosJudicialesDTO.cantidadDeIngresos;
    situacionJudicial.expediente_fecha_de_documento = registroDatosJudicialesDTO.expediente_fechaDeDocumento;
    situacionJudicial.expediente_numero_de_documento = registroDatosJudicialesDTO.expediente_numeroDeDocumento;
    
    
    const ingresoAPrision = new IngresoAPrision();
    ingresoAPrision.fecha_ingreso = registroDatosJudicialesDTO.fecha_ingreso_a_establecimiento;
    ingresoAPrision.establecimiento_penitenciario = establecimientoPenitenciario;
    ingresoAPrision.causa = causaJudicial;
    if(ingresoAPrision.causa.condenado){
      ingresoAPrision.fecha_de_salida = causaJudicial.fecha_de_compurgamiento_inicial;
    }else{
      ingresoAPrision.fecha_de_salida = null
    }

    const oficioJudicialAGuardar = new DocumentoOrdenPrision();
    oficioJudicialAGuardar.causa = causaJudicial;
    oficioJudicialAGuardar.fecha = new Date(registroDatosJudicialesDTO.oficioJudicial_fechaDeDocumento);
    oficioJudicialAGuardar.numero_documento = registroDatosJudicialesDTO.oficioJudicial_numeroDeDocumento;
    oficioJudicialAGuardar.ruta = await this.fileService.almacenar_archivo(oficio_judicial,`oficioJudicial_${registroDatosJudicialesDTO.oficioJudicial_fechaDeDocumento}_${registroDatosJudicialesDTO.id_persona}`)
    oficioJudicialAGuardar.tipo = "oficio judicial";

    const resolucionMJAGuardar = new DocumentoOrdenPrision();
    resolucionMJAGuardar.causa = causaJudicial;
    resolucionMJAGuardar.fecha = new Date(registroDatosJudicialesDTO.resolucion_fechaDeDocumento);
    resolucionMJAGuardar.numero_documento = registroDatosJudicialesDTO.resolucion_numeroDeDocumento;
    resolucionMJAGuardar.ruta = await this.fileService.almacenar_archivo(resolucion,`DGEP_${registroDatosJudicialesDTO.resolucion_fechaDeDocumento}_${registroDatosJudicialesDTO.id_persona}`)
    resolucionMJAGuardar.tipo = "resolucion MJ";

    console.log("Documentos que ordenan la prisión:", oficioJudicialAGuardar, resolucionMJAGuardar);

    
    
    
    
    return{
      situacionJudicial:situacionJudicial,
      ingresoAPrision:ingresoAPrision,
      oficioJudicialAGuardar:oficioJudicialAGuardar,
      resolucionMJAGuardar:resolucionMJAGuardar

    }
    
  }

  async generar_datos_judiciales_para_actualizar(id:number, registroDatosJudicialesDTO:RegistroDatosJudicialesDTO, oficio_judicial:Express.Multer.File, resolucion:Express.Multer.File){

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

    const causaJudicial = await this.dataService.causas.get(registroDatosJudicialesDTO.causa);
    if(!causaJudicial){
      throw new HttpException("No existe la causa judicial", HttpStatus.BAD_REQUEST);
    }

    situacionJudicial.primera_vez_en_prision = registroDatosJudicialesDTO.primeraVezEnPrision ;
    situacionJudicial.cantidad_de_veces_que_ingreso = registroDatosJudicialesDTO.cantidadDeIngresos;

    situacionJudicial.ingresos_a_prision = [];
    const ingresoAPrision = new IngresoAPrision();
    ingresoAPrision.fecha_ingreso = registroDatosJudicialesDTO.fecha_ingreso_a_establecimiento;
    ingresoAPrision.establecimiento_penitenciario = establecimientoPenitenciario;
    ingresoAPrision.causa = causaJudicial;
    if(ingresoAPrision.causa.condenado){
      ingresoAPrision.fecha_de_salida = causaJudicial.fecha_de_compurgamiento_inicial;
    }else{
      ingresoAPrision.fecha_de_salida = null
    }

    const oficioJudicialAGuardar = new DocumentoOrdenPrision();
    oficioJudicialAGuardar.causa = causaJudicial;
    oficioJudicialAGuardar.fecha = new Date(registroDatosJudicialesDTO.oficioJudicial_fechaDeDocumento);
    oficioJudicialAGuardar.numero_documento = registroDatosJudicialesDTO.oficioJudicial_numeroDeDocumento;
    oficioJudicialAGuardar.ruta = await this.fileService.almacenar_archivo(oficio_judicial,`oficioJudicial_${registroDatosJudicialesDTO.oficioJudicial_fechaDeDocumento}_${registroDatosJudicialesDTO.id_persona}`)
    

    const resolucionMJAGuardar = new DocumentoOrdenPrision();
    resolucionMJAGuardar.causa = causaJudicial;
    resolucionMJAGuardar.fecha = new Date(registroDatosJudicialesDTO.resolucion_fechaDeDocumento);
    resolucionMJAGuardar.numero_documento = registroDatosJudicialesDTO.resolucion_numeroDeDocumento;
    resolucionMJAGuardar.ruta = await this.fileService.almacenar_archivo(resolucion,`DGEP_${registroDatosJudicialesDTO.resolucion_fechaDeDocumento}_${registroDatosJudicialesDTO.id_persona}`)
   
    console.log("Documentos que ordenan la prisión:", oficioJudicialAGuardar, resolucionMJAGuardar);

    
    
    
    
    return{
      situacionJudicial:situacionJudicial,
      ingresoAPrision:ingresoAPrision,
      oficioJudicialAGuardar:oficioJudicialAGuardar,
      resolucionMJAGuardar:resolucionMJAGuardar

    }
    

  }
}