import { DefensoresController } from "src/framework/controllers/defensores.controller";
import { DefensoresUseCases } from "./defensores-use-cases.services";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { LibModule } from "src/framework/lib/lib.modules";
import { Module } from "@nestjs/common";



@Module(
    {
        imports:[
            PostgresDataServiceModule,
            LibModule
            
          ],
          providers:[
            DefensoresUseCases,
            
          ],
          controllers:[
            DefensoresController
          ]
    }
)
export class DefensoresModule{}