import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { DataBaseService } from "src/core/abstract/data-base-service.abstract"
import { Connection, EntityManager } from "typeorm";

@Injectable()
export class PostgresDataBaseService implements DataBaseService<EntityManager>{

  constructor(
    @InjectEntityManager() private em:EntityManager
  ){}
  async startTransaction(): Promise<EntityManager> {
    return this.em.transaction(async (transactionalEntityManager) =>{
      return transactionalEntityManager;
    })
  }
  commitTransaction(entityManage:EntityManager): Promise<void> {
    throw new Error("Method not implemented.");
  }
  rollBackTransaction(): Promise<void> {
    throw new Error("Method not implemented.");
  }

}