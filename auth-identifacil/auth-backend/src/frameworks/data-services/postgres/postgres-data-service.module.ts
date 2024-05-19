import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioModel } from "./model/usuario.model";
import { RolModel } from "./model/rol.model";
import { PermisoModel } from "./model/permiso.model";
import { IDataService } from "src/core/abstract/data-services.abstract";
import { PostgresDataService } from "./postgres-data-service";


@Module({
  imports:[
    TypeOrmModule.forFeature(
      [
      UsuarioModel, RolModel, PermisoModel
     ])
  ],
  providers:[
    {
      provide: IDataService,
      useClass: PostgresDataService
    }
  ],
  exports:[
    IDataService
  ]
})

export class PostgresDataServiceModule{}