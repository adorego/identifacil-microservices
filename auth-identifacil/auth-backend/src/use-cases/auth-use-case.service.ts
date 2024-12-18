import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-services.abstract";
import { UsuarioDTO } from "src/core/dtos/usario.dto";
import {hash,compare,genSalt} from 'bcryptjs'
import { Usuario } from "src/core/entities/usuario.entity";
import { isNumber } from "class-validator";
import { Rol } from "src/core/entities/rol.entity";
import { CreateUserDTO } from "src/core/dtos/create-user.dto";
import { RolDTO } from "src/core/dtos/rol.dto";
import { Permiso } from "src/core/entities/permiso.entity";
import { PermisoDTO } from "src/core/dtos/permiso.dto";
import { JwtService } from "@nestjs/jwt";

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
        const payload = {sub:usuariosEncontrado.id, ci:usuariosEncontrado.ci, nombre:usuariosEncontrado.nombre, apellido:usuariosEncontrado.apellido}
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