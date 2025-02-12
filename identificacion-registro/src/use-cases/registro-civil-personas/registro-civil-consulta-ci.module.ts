import { Module } from "@nestjs/common";
import { RegistroCivilConsultaCIUseCase } from "./registro-civil-consulta-ci.usecase";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { RegistroCivilConsultaCIController } from "src/framework/controllers/registro-civil-consultaci.controller";


@Module({
    imports:[
          PostgresDataServiceModule,
    ],
    providers:[
        RegistroCivilConsultaCIUseCase,
    ],
    controllers:[
        RegistroCivilConsultaCIController,
    ]
})

export class RegistroConsultaCivilModule{}