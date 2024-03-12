import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";

import { IDataService } from "src/core/abstract/data-service.abstract";
import { LimitacionIdiomatica } from "src/core/entities/limitacion-idiomatica.entity";
import { RegistroSaludDTO } from "src/core/dto/registro_salud/registro-salud.dto";
import { Salud } from "src/core/entities/salud.entity";
import { SaludFisica } from "src/core/entities/salud-fisica.entity";
import { SaludMental } from "src/core/entities/salud-mental.entity";
import { Vacuna } from "src/core/entities/vacuna.entity";

@Injectable()
export class RegistroSaludFactory{
  constructor(private dataService:IDataService){}

  async generarRegistroSalud(registroSaludDTO:RegistroSaludDTO){
      //**********************Validaciones******************************//
    // console.log("Id de persona:",registroSaludDTO.id_persona);
    if(!registroSaludDTO.id_persona){
      throw new HttpException('Error en los parametros, no se recibio el id de la persona', HttpStatus.BAD_REQUEST);
    }
      //Validar que la persona este registrada
    const personaEncontrada = await this.dataService.persona.get(registroSaludDTO.id_persona);
    // console.log('Persona Encontrada', personaEncontrada);
    if (!personaEncontrada){
      throw new NotFoundException('Esta persona no está registrada');
    }
   
    if(personaEncontrada.salud){
      throw new HttpException(`Error, ya existe un registro de salud previo`, HttpStatus.BAD_REQUEST);
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

    if(registroSaludDTO.vacunas_recibidas_modificado && registroSaludDTO.vacunas_recibidas.length > 0){
      let vacunas_recibidas:Vacuna[] = [];
      if(registroSaludDTO.vacunas_recibidas.length > 0){
        const vacunas:Vacuna[] = await this.dataService.vacuna.getAll();
        
        registroSaludDTO.vacunas_recibidas.map(
          (vacunaId) =>{
            const vacuna = vacunas.find((vacuna) => vacuna.id === vacunaId);
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
    registroSalud.vacunas_recibidas_modificado = registroSaludDTO.vacunas_recibidas_modificado;

    registroSalud.persona = personaEncontrada;
    registroSalud.tieneAfeccionADrogras = registroSaludDTO.tieneAfeccionADrogras;
    registroSalud.tieneAfeccionADrogas_modificado = registroSaludDTO.tieneAfeccionADrogas_modificado;
    registroSalud.presion_arterial = registroSaludDTO.presion_arterial;
    registroSalud.presion_arterial_modificado = registroSaludDTO.presion_arterial_modificado;
    registroSalud.frecuencia_cardiaca = registroSaludDTO.frecuencia_cardiaca;
    registroSalud.frecuencia_cardiaca_modificado = registroSaludDTO.frecuencia_cardiaca_modificado;
    registroSalud.frecuencia_respiratoria = registroSaludDTO.frecuencia_respiratoria;
    registroSalud.frecuencia_respiratoria_modificado = registroSaludDTO.frecuencia_respiratoria_modificado;
    registroSalud.temperatura = registroSaludDTO.temperatura;
    registroSalud.temperatura_modificado = registroSaludDTO.temperatura_modificado;
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
    registroSalud.fecha_parto_modificado = registroSaludDTO.fecha_parto_modificado;
    


    // Salud Mental
    const registroSaludMental = new SaludMental();
    registroSaludMental.sigue_tratamiento_mental = registroSaludDTO.saludMental.sigue_tratamiento_mental;
    registroSaludMental.sigue_tratamiento_mental_modificado = registroSaludDTO.saludMental.sigue_tratamiento_mental_modificado;
    registroSaludMental.tiene_antecedentes_de_lesiones_autoinflingidas = registroSaludDTO.saludMental.tiene_antecedentes_de_lesiones_autoinflingidas;
    registroSaludMental.tiene_antecedentes_de_lesiones_autoinflingidas_modificado = registroSaludDTO.saludMental.tiene_antecedentes_de_lesiones_autoinflingidas_modificado;
    registroSaludMental.ha_estado_internado_en_hospital_psiquiatrico = registroSaludDTO.saludMental.ha_estado_internado_en_hospital_psiquiatrico;
    registroSaludMental.ha_estado_internado_en_hospital_psiquiatrico_modificado = registroSaludDTO.saludMental.ha_estado_internado_en_hospital_psiquiatrico_modificado;
    registroSaludMental.reporta_abuso_de_droga_previo_al_ingreso = registroSaludDTO.saludMental.reporta_abuso_de_droga_previo_al_ingreso;
    registroSaludMental.reporta_abuso_de_droga_previo_al_ingreso_modificado = registroSaludDTO.saludMental.reporta_abuso_de_droga_previo_al_ingreso_modificado;
    registroSaludMental.medicacion_actual = registroSaludDTO.saludMental.medicacion_actual;
    registroSaludMental.medicacion_actual_modificado = registroSaludDTO.saludMental.medicacion_actual_modificado;
    registroSaludMental.tiene_afeccion_severa_por_estupefacientes = registroSaludDTO.saludMental.tiene_afeccion_severa_por_estupefacientes;
    registroSaludMental.tiene_afeccion_severa_por_estupefacientes_modificado = registroSaludDTO.saludMental.tiene_afeccion_severa_por_estupefacientes_modificado;
    
    const registroSaludFisica = new SaludFisica();
    registroSaludFisica.discapacidad_fisica = registroSaludDTO.saludFisica.discapacidad_fisica;
    registroSaludFisica.discapacidad_fisica_modificado = registroSaludDTO.saludFisica.discapacidad_fisica_modificado;
    registroSaludFisica.explicacion_de_discapacidad = registroSaludDTO.saludFisica.explicacion_de_discapacidad;
    registroSaludFisica.explicacion_de_discapacidad_modificado = registroSaludDTO.saludFisica.explicacion_de_discapacidad_modificado;

    const registroLimitacionesIdiomaticas = new LimitacionIdiomatica();
    registroLimitacionesIdiomaticas.necesitaInterprete = registroSaludDTO.limitacionesIdiomaticas.necesitaInterprete;
    registroLimitacionesIdiomaticas.necesitaInterprete_modificado = registroSaludDTO.limitacionesIdiomaticas.necesitaInterprete_modificado;
    registroLimitacionesIdiomaticas.tieneDificultadParaLeerYEscribir = registroSaludDTO.limitacionesIdiomaticas.tieneDificultadParaLeerYEscribir;
    registroLimitacionesIdiomaticas.tieneDificultadParaLeerYEscribir_modificado = registroSaludDTO.limitacionesIdiomaticas.tieneDificultadParaLeerYEscribir_modificado;
    
    
    
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
    if(registroSaludDTO.vacunas_recibidas_modificado){
      console.log("Entro en vacunas recibidas");
      let vacunas_recibidas:Vacuna[] = [];
      if(registroSaludDTO.vacunas_recibidas.length > 0){
        const vacunas:Vacuna[] = await this.dataService.vacuna.getAll();
        
        registroSaludDTO.vacunas_recibidas.map(
          (vacunaId) =>{
            const vacuna = vacunas.find((vacuna) => vacuna.id === vacunaId);
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
    registroSaludAActualizar.vacunas_recibidas_modificado = registroSaludDTO.vacunas_recibidas_modificado;
    registroSaludAActualizar.tieneAfeccionADrogras = registroSaludDTO.tieneAfeccionADrogras;
    registroSaludAActualizar.tieneAfeccionADrogas_modificado = registroSaludDTO.tieneAfeccionADrogas_modificado;
    registroSaludAActualizar.presion_arterial = registroSaludDTO.presion_arterial;
    registroSaludAActualizar.presion_arterial_modificado = registroSaludDTO.presion_arterial_modificado;
    registroSaludAActualizar.frecuencia_cardiaca = registroSaludDTO.frecuencia_cardiaca;
    registroSaludAActualizar.frecuencia_cardiaca_modificado = registroSaludDTO.frecuencia_cardiaca_modificado;
    registroSaludAActualizar.frecuencia_respiratoria = registroSaludDTO.frecuencia_respiratoria;
    registroSaludAActualizar.frecuencia_respiratoria_modificado = registroSaludDTO.frecuencia_respiratoria_modificado;
    registroSaludAActualizar.temperatura = registroSaludDTO.temperatura;
    registroSaludAActualizar.temperatura_modificado = registroSaludDTO.temperatura_modificado;
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
    registroSaludAActualizar.fecha_parto_modificado = registroSaludDTO.fecha_parto_modificado;

    let registroSaludMental = registroSaludAActualizar.saludMental;
    if(!registroSaludMental){
      registroSaludMental = new SaludMental();
      
    }
    registroSaludMental.sigue_tratamiento_mental = registroSaludDTO.saludMental.sigue_tratamiento_mental
    registroSaludMental.sigue_tratamiento_mental_modificado = registroSaludDTO.saludMental.sigue_tratamiento_mental_modificado;
    registroSaludMental.tiene_antecedentes_de_lesiones_autoinflingidas = registroSaludDTO.saludMental.tiene_antecedentes_de_lesiones_autoinflingidas;
    registroSaludMental.tiene_antecedentes_de_lesiones_autoinflingidas_modificado = registroSaludDTO.saludMental.tiene_antecedentes_de_lesiones_autoinflingidas_modificado;
    registroSaludMental.ha_estado_internado_en_hospital_psiquiatrico = registroSaludDTO.saludMental.ha_estado_internado_en_hospital_psiquiatrico;
    registroSaludMental.ha_estado_internado_en_hospital_psiquiatrico_modificado = registroSaludDTO.saludMental.ha_estado_internado_en_hospital_psiquiatrico_modificado;
    registroSaludMental.reporta_abuso_de_droga_previo_al_ingreso = registroSaludDTO.saludMental.reporta_abuso_de_droga_previo_al_ingreso;
    registroSaludMental.reporta_abuso_de_droga_previo_al_ingreso_modificado = registroSaludDTO.reporta_abuso_de_droga_previo_al_ingreso_modificado;
    registroSaludMental.medicacion_actual = registroSaludDTO.saludMental.medicacion_actual;
    registroSaludMental.medicacion_actual_modificado = registroSaludDTO.saludMental.medicacion_actual_modificado;
    registroSaludMental.tiene_afeccion_severa_por_estupefacientes = registroSaludDTO.saludMental.tiene_afeccion_severa_por_estupefacientes;
    registroSaludMental.tiene_afeccion_severa_por_estupefacientes_modificado = registroSaludDTO.saludMental.tiene_afeccion_severa_por_estupefacientes_modificado;
    
    let registroSaludFisica = registroSaludAActualizar.saludFisica;
    if(!registroSaludFisica){
      registroSaludFisica = new SaludFisica();
      
    }
    registroSaludFisica.discapacidad_fisica = registroSaludDTO.saludFisica.discapacidad_fisica;
    registroSaludFisica.discapacidad_fisica_modificado = registroSaludDTO.saludFisica.discapacidad_fisica_modificado;
    registroSaludFisica.explicacion_de_discapacidad = registroSaludDTO.saludFisica.explicacion_de_discapacidad;
    registroSaludFisica.explicacion_de_discapacidad_modificado = registroSaludDTO.saludFisica.explicacion_de_discapacidad_modificado;

    let registroLimitacionesIdiomaticas = registroSaludAActualizar.limitacionesIdiomaticas;
    if(!registroLimitacionesIdiomaticas){
      registroLimitacionesIdiomaticas = new LimitacionIdiomatica();
    }
    registroLimitacionesIdiomaticas.necesitaInterprete = registroSaludDTO.limitacionesIdiomaticas.necesitaInterprete;
    registroLimitacionesIdiomaticas.necesitaInterprete_modificado = registroSaludDTO.limitacionesIdiomaticas.necesitaInterprete_modificado;
    registroLimitacionesIdiomaticas.tieneDificultadParaLeerYEscribir = registroSaludDTO.limitacionesIdiomaticas.tieneDificultadParaLeerYEscribir;
    registroLimitacionesIdiomaticas.tieneDificultadParaLeerYEscribir_modificado = registroSaludDTO.limitacionesIdiomaticas.tieneDificultadParaLeerYEscribir_modificado;
    
    
    return{
      registro_salud:registroSaludAActualizar,
      registro_salud_mental:registroSaludMental,
      registro_salud_fisica:registroSaludFisica,
      registro_limitacionesIdiomaticas:registroLimitacionesIdiomaticas,
      persona:personaEncontrada,
    }

  }
}