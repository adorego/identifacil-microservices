import {Repository } from "typeorm";
import { IDataRepository } from "src/core/abstract/data-services.abstract";
import { Injectable } from "@nestjs/common";
import { UserEntity} from "./model/user.model";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostgresDataRepository<UserEntity> implements IDataRepository<UserEntity>{
  
  constructor(
    @InjectRepository(UserEntity)
    private userRepository:Repository<UserEntity>,

  ){
    

  }

  async create(item:UserEntity){
    // console.log("PostgresDataRepository:item", item);
    return  this.userRepository.save(item);

  }
}
 
