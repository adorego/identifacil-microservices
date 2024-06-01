import { Module } from "@nestjs/common";
import { PostgresDataService } from "src/frameworks/data-services/postgres/postgres-data-service";
import { PostgresDataServiceModule } from "src/frameworks/data-services/postgres/postgres-data-service.module";
import { AuthUseCases } from "./auth-use-case.service";
import { AuthController } from "src/frameworks/controllers/auth.controller";


@Module({
    imports:[
        PostgresDataServiceModule
    ],
    providers:[
        AuthUseCases
    ],
    controllers:[
        AuthController
    ]
})
export class AuthModule{}