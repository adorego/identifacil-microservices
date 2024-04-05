import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { EntradaSalidaUseCase } from "./entrada-salida-use-case.service";
import { EntradaSalidaController } from "src/framework/controllers/entradaSalida.controller";



@Module({
    imports:[
      PostgresDataServiceModule
    ],
    providers:[
      EntradaSalidaUseCase
    ],
    controllers:[
        EntradaSalidaController
    ],
    exports:[
        EntradaSalidaUseCase
    ]
  })
  export class EntradaSalidaPPLModule{}