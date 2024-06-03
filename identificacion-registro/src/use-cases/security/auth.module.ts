import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { AuthUseCases } from "./auth-use-case.service";
import { AuthController } from "src/framework/controllers/auth.controller";



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