import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { ConyugeDTO } from "src/core/dto/conyuge/conyuge.dto";
import { RespuestaConyugeFactoryDTO } from "src/core/dto/conyuge/respuesta-conyuge-factory.dto";
import { validadorConyugeDTO } from "src/core/dto/conyuge/validador-conyuge.dto";
import { Concubino } from "src/core/entities/concubino.entity";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { Ppl } from "src/core/entities/ppl.entity";

@Injectable()
export class ConyugeFactory{
    constructor(
        private dataService:IDataService
    ){}

    async generar_conyuge(conyugeDTO:ConyugeDTO):Promise<RespuestaConyugeFactoryDTO>{
        
        const datos_conyuge = await this.validar_crear_concubino_dto(conyugeDTO);




        const nuevoConcubino = new Concubino();
        nuevoConcubino.nombres = conyugeDTO.nombres;
        nuevoConcubino.apellidos = conyugeDTO.apellidos;
        nuevoConcubino.numeroDeIdentificacion = conyugeDTO.numero_de_identificacion;
        nuevoConcubino.es_extranjero = conyugeDTO.es_extranjero;
        nuevoConcubino.fecha_de_nacimiento = new Date(conyugeDTO.fecha_de_nacimiento);
        nuevoConcubino.edad = conyugeDTO.edad;
        nuevoConcubino.sexo = conyugeDTO.sexo;
        nuevoConcubino.lugar_de_nacimiento = conyugeDTO.lugar_de_nacimiento;
        nuevoConcubino.direccion = conyugeDTO.direccion;
        nuevoConcubino.barrio = conyugeDTO.barrio;
        nuevoConcubino.compania = conyugeDTO.compania;
        nuevoConcubino.numero_de_contacto = conyugeDTO.numero_de_contacto;
        nuevoConcubino.dias_de_visita = conyugeDTO.dias_de_visita;
        let datosFamiliaresActuales = datos_conyuge.persona.datosFamiliares;
        if(!datosFamiliaresActuales){
            const datosFamiliaresAGuardar = new DatosFamiliares();
            datosFamiliaresActuales = await this.dataService.datosFamiliares.create(datosFamiliaresAGuardar);
            datos_conyuge.persona.datosFamiliares = datosFamiliaresActuales;
            const personaActualizada = await this.dataService.persona.update(datos_conyuge.persona);
            if(!personaActualizada){
                throw new HttpException("No se puedo actualizar Datos Familiares",HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        
        return{
            concubino:nuevoConcubino,
            datosFamiliares:datosFamiliaresActuales,
            ppl:datos_conyuge.ppl,
            tipo_de_identificacion:datos_conyuge.tipo_de_identificacion

        }

    }

    async validar_crear_concubino_dto(conyugeDTO:ConyugeDTO):Promise<validadorConyugeDTO>{
        if(!conyugeDTO.id_persona){
            throw new HttpException('Se debe enviar el id del PPL de este conyuge',HttpStatus.BAD_REQUEST);
        }
        const pplEncontrado:Ppl = await this.dataService.ppl.getPPLByIdPersona(conyugeDTO.id_persona);

        if(!pplEncontrado){
            throw new HttpException('No se encontró al PPL enviado',HttpStatus.BAD_REQUEST);
        }

        const personaEncontrada = await this.dataService.persona.get(conyugeDTO.id_persona);
        const conyugeActual = personaEncontrada.datosFamiliares?.concubino;
        if(conyugeActual && conyugeActual.id){
            throw new HttpException('El PPL enviado ya tiene concubino',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.nombres){
            throw new HttpException('Se debe enviar el nombre del conyuge',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.apellidos){
            throw new HttpException('Se debe enviar el apellido del conyuge',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.tipo_de_identificacion){
            throw new HttpException('Se debe enviar el tipo de documento',HttpStatus.BAD_REQUEST);
        }

        const tipoDeIdentificacion = await this.dataService.tipo_identificacion.get(conyugeDTO.tipo_de_identificacion);
        if(!tipoDeIdentificacion){
            throw new HttpException('No se encuentra el tipo de identificación enviado',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.numero_de_identificacion){
            throw new HttpException('Se debe enviar un numero de identificación del conyuge',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.fecha_de_nacimiento){
            throw new HttpException('La fecha de nacimiento no puede invalida',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.edad){
            throw new HttpException('La edad no puede ser invalida',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.lugar_de_nacimiento){
            throw new HttpException('El lugar de nacimiento no puede invalido',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.direccion){
            throw new HttpException('La dirección no puede invalida',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.barrio){
            throw new HttpException('El barrio no puede invalido',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.compania){
            throw new HttpException('La compania no puede invalido',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.numero_de_contacto){
            throw new HttpException('El numero de contacto no puede invalido',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.numero_de_contacto){
            throw new HttpException('El numero de contacto no puede invalido',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.numero_de_contacto){
            throw new HttpException('El numero de contacto no puede invalido',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.dias_de_visita){
            throw new HttpException('Los dias de visita no puede invalido',HttpStatus.BAD_REQUEST);
        }
        return {
            ppl:pplEncontrado,
            persona:personaEncontrada,
            tipo_de_identificacion:tipoDeIdentificacion
        };

    }

    async validar_concubino_dto(conyugeDTO:ConyugeDTO):Promise<validadorConyugeDTO>{
        if(!conyugeDTO.id_persona){
            throw new HttpException('Se debe enviar el id del PPL de este conyuge',HttpStatus.BAD_REQUEST);
        }
        const pplEncontrado:Ppl = await this.dataService.ppl.getPPLByIdPersona(conyugeDTO.id_persona);

        if(!pplEncontrado){
            throw new HttpException('No se encontró al PPL enviado',HttpStatus.BAD_REQUEST);
        }

        const personaEncontrada = await this.dataService.persona.get(conyugeDTO.id_persona);

        if(!conyugeDTO.nombres){
            throw new HttpException('Se debe enviar el nombre del conyuge',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.apellidos){
            throw new HttpException('Se debe enviar el apellido del conyuge',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.tipo_de_identificacion){
            throw new HttpException('Se debe enviar el tipo de documento',HttpStatus.BAD_REQUEST);
        }

        const tipoDeIdentificacion = await this.dataService.tipo_identificacion.get(conyugeDTO.tipo_de_identificacion);
        if(!tipoDeIdentificacion){
            throw new HttpException('No se encuentra el tipo de identificación enviado',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.numero_de_identificacion){
            throw new HttpException('Se debe enviar un numero de identificación del conyuge',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.fecha_de_nacimiento){
            throw new HttpException('La fecha de nacimiento no puede invalida',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.edad){
            throw new HttpException('La edad no puede ser invalida',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.lugar_de_nacimiento){
            throw new HttpException('El lugar de nacimiento no puede invalido',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.direccion){
            throw new HttpException('La dirección no puede invalida',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.barrio){
            throw new HttpException('El barrio no puede invalido',HttpStatus.BAD_REQUEST);
        }

        if(!conyugeDTO.compania){
            throw new HttpException('La compania no puede invalido',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.numero_de_contacto){
            throw new HttpException('El numero de contacto no puede invalido',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.numero_de_contacto){
            throw new HttpException('El numero de contacto no puede invalido',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.numero_de_contacto){
            throw new HttpException('El numero de contacto no puede invalido',HttpStatus.BAD_REQUEST);
        }
        if(!conyugeDTO.dias_de_visita){
            throw new HttpException('Los dias de visita no puede invalido',HttpStatus.BAD_REQUEST);
        }
        return {
            ppl:pplEncontrado,
            persona:personaEncontrada,
            tipo_de_identificacion:tipoDeIdentificacion
        };

    }
    async actualizar_conyuge(conyugeDTO:ConyugeDTO):Promise<RespuestaConyugeFactoryDTO>{
        
        const datos_conyuge = await this.validar_concubino_dto(conyugeDTO);




        let concubinoAActualizar = datos_conyuge.persona.datosFamiliares?.concubino;
        
        if(!concubinoAActualizar){
            throw new HttpException('El PPL no tiene un conyuge asociado!',HttpStatus.BAD_REQUEST);
        }
        if(conyugeDTO.numero_de_identificacion !== concubinoAActualizar.numeroDeIdentificacion){
            //Guardar el concubino anterior
            
            const datosFamiliares = datos_conyuge.persona.datosFamiliares;
            datosFamiliares.concubinos_anteriores.push(Object.assign({},concubinoAActualizar))//Inserto una copia del concubino actual
            const datosFamiliaresActualizado = await this.dataService.datosFamiliares.update(datosFamiliares);
            if(!datosFamiliaresActualizado){
                throw new HttpException("No se pudo actualizar Datos Familiares!", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            concubinoAActualizar = new Concubino();
        }
        concubinoAActualizar.nombres = conyugeDTO.nombres;
        concubinoAActualizar.apellidos = conyugeDTO.apellidos;
        concubinoAActualizar.numeroDeIdentificacion = conyugeDTO.numero_de_identificacion;
        concubinoAActualizar.es_extranjero = conyugeDTO.es_extranjero;
        concubinoAActualizar.fecha_de_nacimiento = new Date(conyugeDTO.fecha_de_nacimiento);
        concubinoAActualizar.edad = conyugeDTO.edad;
        concubinoAActualizar.sexo = conyugeDTO.sexo;
        concubinoAActualizar.lugar_de_nacimiento = conyugeDTO.lugar_de_nacimiento;
        concubinoAActualizar.direccion = conyugeDTO.direccion;
        concubinoAActualizar.barrio = conyugeDTO.barrio;
        concubinoAActualizar.compania = conyugeDTO.compania;
        concubinoAActualizar.numero_de_contacto = conyugeDTO.numero_de_contacto;
        concubinoAActualizar.dias_de_visita = conyugeDTO.dias_de_visita;
        
        return{
            concubino:concubinoAActualizar,
            datosFamiliares:datos_conyuge.persona.datosFamiliares,
            ppl:datos_conyuge.ppl,
            tipo_de_identificacion:datos_conyuge.tipo_de_identificacion

        }

    }


}