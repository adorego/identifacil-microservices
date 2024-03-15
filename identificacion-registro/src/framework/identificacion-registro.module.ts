import { DatosFamiliaresController } from "./controllers/datosFamiliares.controller";
import { DatosJudicialesController } from "./controllers/datosJudiciales.controller";
import { DatosPersonalesController } from "./controllers/datosPersonales.controller";
import { DatosSeguridadController } from "./controllers/datosSeguridad.controller";
import { EducacionFormacionController } from "./controllers/educacion.controller";
import { GestionPPLModule } from "src/use-cases/gestion-ppl/getion-ppl.module";
import { IdentificacionController } from "./controllers/identificacion.controller";
import { IdentificacionUseCaseModule } from "src/use-cases/identificacion/identificacion-use-case.module";
import { Module } from "@nestjs/common";
import { PplController } from "./controllers/ppl.controller";
import { RegistroController } from "src/framework/controllers/registro.controller";
import { RegistroUseCasesModule } from "src/use-cases/registro-use-case.module";
import { SaludController } from "./controllers/salud.controller";
import { DatosPenalesController } from "./controllers/datosPenales.controller";
import { DatosPenalesModule } from "src/use-cases/datos-penales/datos-penales.module";

@Module({
  imports:[
    RegistroUseCasesModule,
    IdentificacionUseCaseModule,
    GestionPPLModule,
    DatosPenalesModule,

  ],
  providers:[
    
  ],
  controllers:[
    SaludController,
    RegistroController,
    IdentificacionController,
    DatosPersonalesController,
    EducacionFormacionController,
    DatosFamiliaresController,
    DatosSeguridadController,
    DatosJudicialesController,
    PplController,
    
  ]
})

export class RegistroIdentificacionModule{}