import { IDataRepository } from "src/core/abstract/data-services.abstract";
import { Module } from "@nestjs/common";
import { PostgresDataRepository } from "./postgres-data-service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./model/user.model";
import { UserTypeEntity } from "./model/user-type.model";

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity, UserTypeEntity])
  ],
  providers:[
    {
      provide: IDataRepository,
      useClass: PostgresDataRepository
    }
  ],
  exports:[
    IDataRepository
  ]
})

export class PostgresDataServiceModule{}