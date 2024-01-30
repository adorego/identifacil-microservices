import { IdentificacionUseCaseModule } from "./identificacion-use-case.module";
import { LibModule } from "src/framework/lib/lib.modules";
import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { RegistroDatosFamiliaresFactory } from "./registro-datos-familiares/registro-datosFamiliares.factory";
import { RegistroDatosJudicialesFactory } from "./registro-datos-judiciales/registro-datosJudiciales.factory";
import { RegistroDatosPersonalesFactory } from "./registro-datosPersonales-factory.service";
import { RegistroDatosSeguridadFactory } from "./registro-datos-seguridad/registro-datos-seguridad-factory.service";
import { RegistroEducacionFormacionFactory } from "./educacion-formacion-factory.service";
import { RegistroFactory } from "./registro-factory.services";
import { RegistroSaludFactory } from "./registro-salud-factory.service";
import { RegistroUseCase } from "./registro-use-case.service";

@Module({
  imports:[
    PostgresDataServiceModule,
    LibModule,
    IdentificacionUseCaseModule,
  ],
  providers:[
    RegistroUseCase,
    RegistroFactory,
    RegistroSaludFactory,
    RegistroDatosPersonalesFactory,
    RegistroEducacionFormacionFactory,
    RegistroDatosFamiliaresFactory,
    RegistroDatosJudicialesFactory,
    RegistroDatosSeguridadFactory,
  
  ],
  controllers:[],
  exports:[
    RegistroUseCase,
    RegistroFactory,
    RegistroSaludFactory,
    RegistroDatosPersonalesFactory,
    RegistroEducacionFormacionFactory,
    RegistroDatosFamiliaresFactory,
    RegistroDatosSeguridadFactory,
  ]
})
export class RegistroUseCasesModule{}