import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { FaltasSancionesUseCases } from "./faltas-y-sanciones-use-cases.service";
import { FaltasSancionesFactory } from "./faltas-y-sanciones-factory.service";
import { FaltasSancionesController } from "src/framework/controllers/faltasSanciones.controller";
import { LibModule } from "src/framework/lib/lib.modules";



@Module(
    {
        imports:[
            PostgresDataServiceModule,
            LibModule
            
          ],
          providers:[
            FaltasSancionesUseCases,
            FaltasSancionesFactory
          ],
          controllers:[
            FaltasSancionesController
          ]
    }
)
export class FaltasSancionesModule{}