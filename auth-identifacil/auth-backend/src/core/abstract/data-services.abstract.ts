import { Permiso } from "../entities/permiso.entity";
import { Rol } from "../entities/rol.entity";
import { Usuario } from "../entities/usuario.entity";
import { IGenericRepository } from "./generic-repository.abstract";

export abstract class IDataService{
  abstract usuario:IGenericRepository<Usuario>;
  abstract rol:IGenericRepository<Rol>;
  abstract permiso:IGenericRepository<Permiso>;
  
}