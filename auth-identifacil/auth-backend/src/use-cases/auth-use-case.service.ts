import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-services.abstract";
import { usuarioDTO } from "src/core/dtos/usario.dto";
import {hash,compare,genSalt} from 'bcryptjs'
import { Usuario } from "src/core/entities/usuario.entity";
import { isNumber } from "class-validator";
import { Rol } from "src/core/entities/rol.entity";
import { CreateUserDTO } from "src/core/dtos/create-user.dto";
import { RolDTO } from "src/core/dtos/rol.dto";
import { Permiso } from "src/core/entities/permiso.entity";

const SALTROUNDS = 10;
@Injectable()
export class AuthUseCases{
    private readonly logger = new Logger("AuthUseCases");

    constructor(
        private dataService:IDataService
    ){}

    async createUser(usuario:usuarioDTO,roles:Array<number>):Promise<CreateUserDTO>{
        
        const resultadoValidacion = this.validarUsuario(usuario,roles);
        const salt = await genSalt(SALTROUNDS);
        const createdHash = await hash(usuario.clave,salt);

        const nuevoUsuario = new Usuario();
        nuevoUsuario.nombre = usuario.nombres;
        nuevoUsuario.apellido = usuario.apellidos;
        nuevoUsuario.ci = usuario.ci;
        nuevoUsuario.hash = createdHash;
        nuevoUsuario.salt = salt;
        nuevoUsuario.roles = await this.obtener_roles(roles);
        const result = await this.dataService.usuario.create(nuevoUsuario);
        return{
            success:true,
            id:result.id
        }

    }

    async validarUsuario(usuarioDTO:usuarioDTO,roles:Array<number>){
        if(!usuarioDTO.nombres){
            throw new HttpException("Se debe enviar un nombre de usuario",HttpStatus.BAD_REQUEST);
        }
        if(!usuarioDTO.apellidos){
            throw new HttpException("Se debe enviar un apellido de usuario",HttpStatus.BAD_REQUEST);
        }
        if(!usuarioDTO.ci || !isNumber(usuarioDTO.ci)){
            throw new HttpException("Se debe enviar numero de cedula valido",HttpStatus.BAD_REQUEST);
        }
        if(!usuarioDTO.clave){
            throw new HttpException("Se debe enviar una clave valida",HttpStatus.BAD_REQUEST);
        }

        if(roles.length==0){
            throw new HttpException("La lista de roles no puede ser cero",HttpStatus.BAD_REQUEST);
        }
    }

    async obtener_roles(roles:Array<number>):Promise<Array<Rol>>{
        const rolesEncontrados = await Promise.all(roles.map(
            async (rol)=>{
                const rolEncontrado = await this.dataService.rol.get(rol);
                if(!rolEncontrado){
                    throw new HttpException(`No se encontró el rol enviado:${rol}`,HttpStatus.BAD_REQUEST);
                }
                return rolEncontrado
            }
        ))
        return rolesEncontrados
    }

    async createRol(rolDTO:RolDTO){
        this.validarRol(rolDTO);
        const permisosObtenidos:Array<Permiso> = await this.obtener_permisos(rolDTO.permisos)
    }

    async validarRol(rolDTO:RolDTO){
        if(!rolDTO.nombre){
            throw new HttpException("Se debe enviar un nombre valido para el Rol a crear",HttpStatus.BAD_REQUEST);
        }
        if(!rolDTO.permisos || rolDTO.permisos.length == 0){
            throw new HttpException("Se deben enviar permisos validos para el rol a crear",HttpStatus.BAD_REQUEST);
        }

    }

    async obtener_permisos(permisos:Array<number>):Promise<Array<Permiso>>{
        const permisosObtenidos = await Promise.all(permisos.map(
            async (permiso)=>{
                return await this.dataService.permiso.get(permiso);
            }
        ));
        return permisosObtenidos;
    }
}