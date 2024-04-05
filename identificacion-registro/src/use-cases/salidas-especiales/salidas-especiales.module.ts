import { Module } from "@nestjs/common";
import { PostgresDataService } from "src/framework/data-service/postgres/postgres-data.service";
import { SalidasEspecialesUseCase } from "./salidas-especiales-use-case.service";


@Module({
    imports:[
        PostgresDataService
    ],
    providers:[
        SalidasEspecialesUseCase
    ],
    exports:[

    ]
})

export class SalidasEspecialesModule{}