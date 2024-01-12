import { DatosPersonalesController } from "./controllers/datosPersonales.controller";
import { IdentificacionController } from "./controllers/identificacion.controller";
import { IdentificacionUseCaseModule } from "src/use-cases/identificacion-use-case.module";
import { Module } from "@nestjs/common";
import { RegistroController } from "src/framework/controllers/registro.controller";
import { RegistroUseCasesModule } from "src/use-cases/registro-use-case.module";
import { SaludController } from "./controllers/salud.controller";

@Module({
  imports:[
    RegistroUseCasesModule,
    IdentificacionUseCaseModule
  ],
  providers:[
    
  ],
  controllers:[
    SaludController,
    RegistroController,
    IdentificacionController,
    DatosPersonalesController,
  ]
})

export class RegistroIdentificacionModule{}