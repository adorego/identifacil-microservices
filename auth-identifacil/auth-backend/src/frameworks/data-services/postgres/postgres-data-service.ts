import { OnApplicationBootstrap } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-services.abstract";
import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { Permiso } from "src/core/entities/permiso.entity";
import { Rol } from "src/core/entities/rol.entity";
import { Usuario } from "src/core/entities/usuario.entity";
import { PostgresGenericRepository } from "./postgres-generic-repository";
import { UsuarioModel } from "./model/usuario.model";
import { RolModel } from "./model/rol.model";
import { PermisoModel } from "./model/permiso.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


export class PostgresDataService implements IDataService, OnApplicationBootstrap{
    usuario: PostgresGenericRepository<UsuarioModel>;
    rol: PostgresGenericRepository<RolModel>;
    permiso: PostgresGenericRepository<PermisoModel>;

    constructor(
        @InjectRepository(UsuarioModel)
        private usuario_repository:Repository<UsuarioModel>,
        @InjectRepository(RolModel)
        private rol_repository:Repository<RolModel>,
        @InjectRepository(PermisoModel)
        private permiso_repository:Repository<PermisoModel>
    ){}

    onApplicationBootstrap() {
        this.usuario = new PostgresGenericRepository<UsuarioModel>(this.usuario_repository);
        this.rol = new PostgresGenericRepository<RolModel>(this.rol_repository);
        this.permiso = new PostgresGenericRepository<PermisoModel>(this.permiso_repository);
    }
    
}