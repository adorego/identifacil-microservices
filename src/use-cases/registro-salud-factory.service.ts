import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";

import { IDataService } from "src/core/abstract/data-service.abstract";
import { LimitacionIdiomatica } from "src/core/entities/limitacion-idiomatica.entity";
import { Persona } from "src/core/entities/persona.entity";
import { PersonaModel } from "src/framework/data-service/postgres/models/persona.model";
import { RegistroSaludDTO } from "src/core/dto/registro/registro-salud.dto";
import { Salud } from "src/core/entities/salud.entity";
import { SaludFisica } from "src/core/entities/salud-fisica.entity";
import { SaludMental } from "src/core/entities/salud-mental.entity";
import { Vacuna } from "src/core/entities/vacuna.entity";

export interface RespuestaRegistroSaludfactory{
  registro_salud:Salud;
  registro_salud_mental:SaludMental;
  registro_salud_fisica:SaludFisica;
  registro_limitacionesIdiomaticas:LimitacionIdiomatica;
  persona:Persona;
}
@Injectable()
export class RegistroSaludFactory{
  constructor(private dataService:IDataService){}

  async crearRegistroSalud(registroSaludDTO:RegistroSaludDTO):Promise<RespuestaRegistroSaludfactory>{
      //**********************Validaciones******************************//
    // console.log("Id de persona:",registroSaludDTO.id_persona);
    if(!registroSaludDTO.id_persona){
      throw new HttpException('Error en los parametros, no se recibio el id de la persona', HttpStatus.BAD_REQUEST);
    }
      //Validar que la persona este registrada
    const personaEncontrada = await this.dataService.persona.get(registroSaludDTO.id_persona);
    console.log('Persona Encontrada', personaEncontrada);
    if (!personaEncontrada){
      throw new NotFoundException('Esta persona no está registrada');
    }
   
    
    
    const registroSalud = new Salud();
    if(registroSaludDTO.grupo_sanguineo_modificado){
      let grupo_sanguineo = undefined;
      if(registroSaludDTO.grupo_sanguineo){
        grupo_sanguineo = await this.dataService.grupo_sanguineo.get(registroSaludDTO.grupo_sanguineo);
        if(!grupo_sanguineo){
          throw new NotFoundException('El grupo sanguineo no existe');
        }
      }
      registroSalud.grupo_sanguineo = grupo_sanguineo;
      
    }
    registroSalud.grupo_sanguineo_modificado = registroSaludDTO.grupo_sanguineo_modificado

    if(registroSaludDTO.vacunas_recibidas_modificada){
      let vacunas_recibidas:Vacuna[] = [];
      if(registroSaludDTO.vacunas_recibidas.length > 0){
        const vacunas:Vacuna[] = await this.dataService.vacuna.getAll();
        
        registroSaludDTO.vacunas_recibidas.map(
          (vacunaId) =>{
            const vacuna = vacunas.find((vacuna) => vacuna.id === vacunaId.id);
            if(!vacuna){
              throw new NotFoundException(`No existe la vacuna con el id:${vacunaId}`);
            }else{
              vacunas_recibidas.push(vacuna);
            }
          }
        );
      }
      registroSalud.vacunas_recibidas = vacunas_recibidas;
      
    }
    registroSalud.vacunas_recibidas_modificada = registroSaludDTO.vacunas_recibidas_modificada;

    registroSalud.persona = personaEncontrada;
    registroSalud.tieneAfeccionADrogras = registroSaludDTO.tieneAfeccionADrogras;
    registroSalud.tieneAfeccionADrogas_modificado = registroSaludDTO.tieneAfeccionADrogas_modificado;
    registroSalud.presion_arterial = registroSaludDTO.presion_arterial;
    registroSalud.presion_arterial_modificada = registroSaludDTO.presion_arterial_modificada;
    registroSalud.frecuencia_cardiaca_modificada = registroSaludDTO.frecuencia_cardiaca_modificada;
    registroSalud.frecuencia_respiratoria = registroSaludDTO.frecuencia_respiratoria;
    registroSalud.frecuencia_respiratoria_modificada = registroSaludDTO.frecuencia_respiratoria_modificada;
    registroSalud.temperatura = registroSaludDTO.temperatura;
    registroSalud.temperatura_modificada = registroSaludDTO.temperatura_modificada;
    registroSalud.peso = registroSaludDTO.peso;
    registroSalud.peso_modificado = registroSaludDTO.peso_modificado;
    registroSalud.talla = registroSaludDTO.talla;
    registroSalud.talla_modificado = registroSaludDTO.talla_modificado;
    registroSalud.imc = registroSaludDTO.imc;
    registroSalud.imc_modificado = registroSaludDTO.imc_modificado;
    registroSalud.vdrl = registroSaludDTO.vdrl;
    registroSalud.vdrl_modificado = registroSaludDTO.vdrl_modificado;
    registroSalud.vih = registroSaludDTO.vih;
    registroSalud.vih_modificado = registroSaludDTO.vih_modificado;
    registroSalud.tb = registroSaludDTO.tb;
    registroSalud.tb_modificado = registroSaludDTO.tb_modificado;
    registroSalud.gestacion = registroSaludDTO.gestacion;
    registroSalud.gestacion_modificado = registroSaludDTO.gestacion_modificado;
    registroSalud.tiempo_gestacion = registroSaludDTO.tiempo_gestacion;
    registroSalud.tiempo_gestacion_modificado = registroSaludDTO.tiempo_gestacion_modificado;
    registroSalud.fecha_parto = registroSaludDTO.fecha_parto ?  new Date(`${registroSaludDTO.fecha_parto}`) : null;
    registroSalud.fecha_parto_modificada = registroSaludDTO.fecha_parto_modificada;
    


    // Salud Mental
    const registroSaludMental = new SaludMental();
    registroSaludMental.sigue_tratamiento_mental = registroSaludDTO.sigue_tratamiento_mental;
    registroSaludMental.sigue_tratamiento_mental_modificado = registroSaludDTO.sigue_tratamiento_mental_modificado;
    registroSaludMental.tiene_antecedentes_de_lesiones_autoinflingidas = registroSaludDTO.tiene_antecedentes_de_lesiones_autoinflingidas;
    registroSaludMental.tiene_antecedentes_de_lesiones_autoinflingidas_modificado = registroSaludDTO.tiene_antecedentes_de_lesiones_autoinflingidas_modificado;
    registroSaludMental.ha_estado_internado_en_hospital_psiquiatrico = registroSaludDTO.ha_estado_internado_en_hospital_psiquiatrico;
    registroSaludMental.ha_estado_internado_en_hospital_psiquiatrico_modificado = registroSaludDTO.ha_estado_internado_en_hospital_psiquiatrico_modificado;
    registroSaludMental.reporta_abuso_de_droga_previo_al_ingreso = registroSaludDTO.reporta_abuso_de_droga_previo_al_ingreso;
    registroSaludMental.reporta_abuso_de_droga_previo_al_ingreso_modificado = registroSaludDTO.reporta_abuso_de_droga_previo_al_ingreso_modificado;
    registroSaludMental.medicacion_actual = registroSaludDTO.medicacion_actual;
    registroSaludMental.medicacion_actual_modificada = registroSaludDTO.medicacion_actual_modificada;
    registroSaludMental.tiene_afeccion_severa_por_estupefacientes = registroSaludDTO.tiene_afeccion_severa_por_estupefacientes;
    registroSaludMental.tiene_afeccion_severa_por_estupefaciente_modificado = registroSaludDTO.tiene_afeccion_severa_por_estupefaciente_modificado;
    
    const registroSaludFisica = new SaludFisica();
    registroSaludFisica.discapacidad_fisica = registroSaludDTO.discapacidad_fisica;
    registroSaludFisica.discapacidad_modificada = registroSaludDTO.discapacidad_modificada;
    
    const registroLimitacionesIdiomaticas = new LimitacionIdiomatica();
    registroLimitacionesIdiomaticas.necesitaInterprete = registroSaludDTO.necesitaInterprete;
    registroLimitacionesIdiomaticas.necesitaInterprete_modificado = registroSaludDTO.necesitaInterprete_modificado;
    registroLimitacionesIdiomaticas.tieneDificultadParaLeerYEscribir = registroSaludDTO.tieneDificultadParaLeerYEscribir;
    registroLimitacionesIdiomaticas.tieneDificultadParaLeerYEscribir_modificado = registroSaludDTO.tieneDificultadParaLeerYEscribir_modificado;
    
    
    
    return {
      registro_salud:registroSalud,
      registro_salud_mental:registroSaludMental,
      registro_salud_fisica:registroSaludFisica,
      registro_limitacionesIdiomaticas:registroLimitacionesIdiomaticas,
      persona:personaEncontrada
    };

  }

  async actualizarRegistroSalud(id:number,registroSaludDTO:RegistroSaludDTO){

    //Validar el id del registro
    if(!id){
      throw new HttpException('Se debe enviar el id del registro', HttpStatus.BAD_REQUEST);
    }

    let registroSaludAActualizar = await this.dataService.salud.get(id);

    if(!registroSaludAActualizar){
      throw new HttpException('No se encontro el registro de salud a actualizar', HttpStatus.BAD_REQUEST);
    }
    //Validar que se envió el id_persona
    if(!registroSaludDTO.id_persona){
        throw new HttpException('Error en los parametros, no se recibio el id de la persona', HttpStatus.BAD_REQUEST);
    }

    //Validar que la persona este registrada
    const personaEncontrada = await this.dataService.persona.get(registroSaludDTO.id_persona);
    console.log('Persona Encontrada', personaEncontrada);
    if (!personaEncontrada){
      throw new NotFoundException('Esta persona no está registrada');
    }

    //Grupo Sanguineo
    if(registroSaludDTO.grupo_sanguineo_modificado){
      const grupo_sanguineo = await this.dataService.grupo_sanguineo.get(registroSaludDTO.grupo_sanguineo);
      registroSaludAActualizar.grupo_sanguineo = grupo_sanguineo;
    }else{
      registroSaludAActualizar.grupo_sanguineo = null;
    }
    registroSaludAActualizar.grupo_sanguineo_modificado = registroSaludDTO.grupo_sanguineo_modificado;
    if(registroSaludDTO.vacunas_recibidas_modificada){
      let vacunas_recibidas:Vacuna[] = [];
      if(registroSaludDTO.vacunas_recibidas.length > 0){
        const vacunas:Vacuna[] = await this.dataService.vacuna.getAll();
        
        registroSaludDTO.vacunas_recibidas.map(
          (vacunaId) =>{
            const vacuna = vacunas.find((vacuna) => vacuna.id === vacunaId.id);
            if(!vacuna){
              throw new NotFoundException(`No existe la vacuna con el id:${vacunaId}`);
            }else{
              vacunas_recibidas.push(vacuna);
            }
          }
        );
      }
      registroSaludAActualizar.vacunas_recibidas = vacunas_recibidas;
    }
    registroSaludAActualizar.vacunas_recibidas_modificada = registroSaludDTO.vacunas_recibidas_modificada;
    registroSaludAActualizar.tieneAfeccionADrogras = registroSaludDTO.tieneAfeccionADrogras;
    registroSaludAActualizar.tieneAfeccionADrogas_modificado = registroSaludDTO.tieneAfeccionADrogas_modificado;
    registroSaludAActualizar.presion_arterial = registroSaludDTO.presion_arterial;
    registroSaludAActualizar.presion_arterial_modificada = registroSaludDTO.presion_arterial_modificada;
    registroSaludAActualizar.frecuencia_cardiaca_modificada = registroSaludDTO.frecuencia_cardiaca_modificada;
    registroSaludAActualizar.frecuencia_respiratoria = registroSaludDTO.frecuencia_respiratoria;
    registroSaludAActualizar.frecuencia_respiratoria_modificada = registroSaludDTO.frecuencia_respiratoria_modificada;
    registroSaludAActualizar.temperatura = registroSaludDTO.temperatura;
    registroSaludAActualizar.temperatura_modificada = registroSaludDTO.temperatura_modificada;
    registroSaludAActualizar.peso = registroSaludDTO.peso;
    registroSaludAActualizar.peso_modificado = registroSaludDTO.peso_modificado;
    registroSaludAActualizar.talla = registroSaludDTO.talla;
    registroSaludAActualizar.talla_modificado = registroSaludDTO.talla_modificado;
    registroSaludAActualizar.imc = registroSaludDTO.imc;
    registroSaludAActualizar.imc_modificado = registroSaludDTO.imc_modificado;
    registroSaludAActualizar.vdrl = registroSaludDTO.vdrl;
    registroSaludAActualizar.vdrl_modificado = registroSaludDTO.vdrl_modificado;
    registroSaludAActualizar.vih = registroSaludDTO.vih;
    registroSaludAActualizar.vih_modificado = registroSaludDTO.vih_modificado;
    registroSaludAActualizar.tb = registroSaludDTO.tb;
    registroSaludAActualizar.tb_modificado = registroSaludDTO.tb_modificado;
    registroSaludAActualizar.gestacion = registroSaludDTO.gestacion;
    registroSaludAActualizar.gestacion_modificado = registroSaludDTO.gestacion_modificado;
    registroSaludAActualizar.tiempo_gestacion = registroSaludDTO.tiempo_gestacion;
    registroSaludAActualizar.tiempo_gestacion_modificado = registroSaludDTO.tiempo_gestacion_modificado;
    registroSaludAActualizar.fecha_parto = registroSaludDTO.fecha_parto ?  new Date(`${registroSaludDTO.fecha_parto}`) : null;
    registroSaludAActualizar.fecha_parto_modificada = registroSaludDTO.fecha_parto_modificada;

    let registroSaludMental = registroSaludAActualizar.saludMental;
    if(!registroSaludMental){
      registroSaludMental = new SaludMental();
      
    }
    registroSaludMental.sigue_tratamiento_mental = registroSaludDTO.sigue_tratamiento_mental;
    registroSaludMental.sigue_tratamiento_mental_modificado = registroSaludDTO.sigue_tratamiento_mental_modificado;
    registroSaludMental.tiene_antecedentes_de_lesiones_autoinflingidas = registroSaludDTO.tiene_antecedentes_de_lesiones_autoinflingidas;
    registroSaludMental.tiene_antecedentes_de_lesiones_autoinflingidas_modificado = registroSaludDTO.tiene_antecedentes_de_lesiones_autoinflingidas_modificado;
    registroSaludMental.ha_estado_internado_en_hospital_psiquiatrico = registroSaludDTO.ha_estado_internado_en_hospital_psiquiatrico;
    registroSaludMental.ha_estado_internado_en_hospital_psiquiatrico_modificado = registroSaludDTO.ha_estado_internado_en_hospital_psiquiatrico_modificado;
    registroSaludMental.reporta_abuso_de_droga_previo_al_ingreso = registroSaludDTO.reporta_abuso_de_droga_previo_al_ingreso;
    registroSaludMental.reporta_abuso_de_droga_previo_al_ingreso_modificado = registroSaludDTO.reporta_abuso_de_droga_previo_al_ingreso_modificado;
    registroSaludMental.medicacion_actual = registroSaludDTO.medicacion_actual;
    registroSaludMental.medicacion_actual_modificada = registroSaludDTO.medicacion_actual_modificada;
    registroSaludMental.tiene_afeccion_severa_por_estupefacientes = registroSaludDTO.tiene_afeccion_severa_por_estupefacientes;
    registroSaludMental.tiene_afeccion_severa_por_estupefaciente_modificado = registroSaludDTO.tiene_afeccion_severa_por_estupefaciente_modificado;
    
    let registroSaludFisica = registroSaludAActualizar.saludFisica;
    if(!registroSaludFisica){
      registroSaludFisica = new SaludFisica();
      
    }
    registroSaludFisica.discapacidad_fisica = registroSaludDTO.discapacidad_fisica;
    registroSaludFisica.discapacidad_modificada = registroSaludDTO.discapacidad_modificada;
    
    let registroLimitacionesIdiomaticas = registroSaludAActualizar.limitacionesIdiomaticas;
    if(!registroLimitacionesIdiomaticas){
      registroLimitacionesIdiomaticas = new LimitacionIdiomatica();
    }
    registroLimitacionesIdiomaticas.necesitaInterprete = registroSaludDTO.necesitaInterprete;
    registroLimitacionesIdiomaticas.necesitaInterprete_modificado = registroSaludDTO.necesitaInterprete_modificado;
    registroLimitacionesIdiomaticas.tieneDificultadParaLeerYEscribir = registroSaludDTO.tieneDificultadParaLeerYEscribir;
    registroLimitacionesIdiomaticas.tieneDificultadParaLeerYEscribir_modificado = registroSaludDTO.tieneDificultadParaLeerYEscribir_modificado;
    
    
    return{
      registro_salud:registroSaludAActualizar,
      registro_salud_mental:registroSaludMental,
      registro_salud_fisica:registroSaludFisica,
      registro_limitacionesIdiomaticas:registroLimitacionesIdiomaticas,
      persona:personaEncontrada,
    }

  }
}