import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import {hash,compare,genSalt} from 'bcryptjs'

import { JwtService } from "@nestjs/jwt";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { UsuarioDTO } from "src/core/dto/security/usario.dto";
import { CreateUserDTO } from "src/core/dto/security/create-user.dto";
import { Usuario } from "src/core/entities/security/usuario.entity";
import { RolDTO } from "src/core/dto/security/rol.dto";
import { Permiso } from "src/core/entities/security/permiso.entity";
import { Rol } from "src/core/entities/security/rol.entity";
import { PermisoDTO } from "src/core/dto/security/permiso.dto";

const SALTROUNDS = 10;
@Injectable()
export class AuthUseCases{
    private readonly logger = new Logger("AuthUseCases");

    constructor(
        private dataService:IDataService,
        private jwtService:JwtService
    ){}

    async login(ci:string,clave:string){
        const usuariosEncontrado = await this.dataService.usuario.findUsuario(ci);
        if(!usuariosEncontrado){
            throw new HttpException("No existe el usuario enviado",HttpStatus.BAD_REQUEST);
        }
        console.log("Usuario:", usuariosEncontrado);
        
        const passwordCompare = await compare(clave,usuariosEncontrado.hash);
        console.log("Password compare:", passwordCompare);
        if(!passwordCompare){
            throw new HttpException("Credenciales incorrectas",HttpStatus.UNAUTHORIZED);
        }
        console.log("Roles:", usuariosEncontrado.roles);
        const payload = {sub:usuariosEncontrado.id, ci:usuariosEncontrado.ci, nombre:usuariosEncontrado.nombre, apellido:usuariosEncontrado.apellido, roles:usuariosEncontrado.roles}
        return{
            access_token: await this.jwtService.signAsync(payload),
            id_usuario:usuariosEncontrado.id
        }
    }

    async createUser(usuario:UsuarioDTO,roles:Array<number>):Promise<CreateUserDTO>{
        
        const resultadoValidacion = await this.validarUsuario(usuario,roles);
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

    async validarUsuario(usuarioDTO:UsuarioDTO,roles:Array<number>){
        if(!usuarioDTO.nombres){
            throw new HttpException("Se debe enviar un nombre de usuario",HttpStatus.BAD_REQUEST);
        }
        if(!usuarioDTO.apellidos){
            throw new HttpException("Se debe enviar un apellido de usuario",HttpStatus.BAD_REQUEST);
        }
        if(!usuarioDTO.ci){
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

    async getRoles(){
        const roles = await this.dataService.rol.getAll();
        const rolesConPermisos = await Promise.all(roles.map(
            async (rol)=>{
                return await this.dataService.rol.getRolConPermisos(rol.id);
            }
        ))
        return rolesConPermisos;
    }

    async getOneRol(id:number){
        const resultado = await this.dataService.rol.getRolConPermisos(id);
        if(!resultado){
            throw new HttpException("No se encuentra el Rol solicitado", HttpStatus.BAD_REQUEST);
        }
        return resultado;
    }

    async getUsuarios(){
        const resultado:Array<Usuario> = await this.dataService.usuario.getAll();
        const usuariosAResponder = resultado.map(
            (usuario)=>{
                return {
                    id:usuario.id,
                    nombre:usuario.nombre,
                    apellido:usuario.apellido,
                    ci:usuario.ci,
                    roles:usuario.roles
                }
            }
        )
        return usuariosAResponder;
    }

    async getPermisosPorRol(id:number){
        //console.log("Id recibido:", id);
        const resultado:Rol = await this.dataService.rol.getRolConPermisos(id);
        //console.log("Resultado:", resultado);
        if(!resultado){
            throw new HttpException("No existe un rol con este id", HttpStatus.BAD_REQUEST);
        }
        return resultado.permisos
    }
    async getOneUsuario(id:number){
        const resultado:Usuario = await this.dataService.usuario.get(id);
        if(!resultado){
            throw new HttpException("No se encuentra el usuario solicitado", HttpStatus.BAD_REQUEST);
        }
        return{
            id:resultado.id,
            nombre:resultado.nombre,
            apellido:resultado.apellido,
            ci:resultado.ci,
            roles:resultado.roles
        }
    }

    async getPermisos(){
        return await this.dataService.permiso.getAll();
    }

    async getOnepermiso(id:number){
        const resultado = await this.dataService.permiso.get(id);
        if(!resultado){
            throw new HttpException("No se encuentra el permiso solicitado", HttpStatus.BAD_REQUEST);
        }
        return resultado;
    }
    async createRol(rolDTO:RolDTO){
        this.validarRol(rolDTO);
        const permisosObtenidos:Array<Permiso> = await this.obtener_permisos(rolDTO.permisos);
        const nuevoRol = new Rol();
        nuevoRol.nombre = rolDTO.nombre;
        nuevoRol.permisos = permisosObtenidos;
        const resultadoCrearRol = await this.dataService.rol.create(nuevoRol);
        return{
            id:resultadoCrearRol.id
        }
    }

    async updateRol(id:number,rolDTO:RolDTO){
        if(!id){
            throw new HttpException("El rol debe ser valido", HttpStatus.BAD_REQUEST);
        }
        const rolEncontrado = await this.dataService.rol.get(id);
        if(!rolEncontrado){
            throw new HttpException("No se encontró el Rol Enviado", HttpStatus.BAD_REQUEST);
        }
        if(rolDTO.permisos.length == 0){
            throw new HttpException("El rol debe tener por lo menos un permiso válido", HttpStatus.BAD_REQUEST);
        }
        const permisosEncontrados = await Promise.all(rolDTO.permisos.map(
            async (permisoId)=>{
                const permisoEncontrado = await this.dataService.permiso.get(permisoId);
                if(!permisoEncontrado){
                    throw new HttpException(`El permiso ${permisoId} no es valido`, HttpStatus.BAD_REQUEST);
                }
                return permisoEncontrado;
            }
        ))

        rolEncontrado.nombre = rolDTO.nombre;
        rolEncontrado.permisos = permisosEncontrados;
        const resultado = await this.dataService.rol.update(rolEncontrado);
        return{
            id:resultado.id
        }


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
                const permisoEncontrado = await this.dataService.permiso.get(permiso);
                if(!permisoEncontrado){
                    throw new HttpException(`No se encuntra el permiso:${permiso}`,HttpStatus.NOT_FOUND)
                }
                return permisoEncontrado
            }
        ));
        return permisosObtenidos;
    }

    async createPermiso(permisosDTO:Array<PermisoDTO>){
        if(permisosDTO.length == 0){
            throw new HttpException("No se puede procesar una lista de permisos vacia",HttpStatus.BAD_REQUEST);
        }
        const permisosCreados = await Promise.all(permisosDTO.map(
            async (permiso)=>{
                const nuevoPermiso = new Permiso();
                nuevoPermiso.nombre = permiso.nombre
                const resultado = await this.dataService.permiso.create(nuevoPermiso);
                return resultado.id;
            }
        ))
        
        return{
            permisos:permisosCreados
        }
        
    }
}