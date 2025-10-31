import type { Usuario } from "../models/usuario.model.js";
import type { UsuarioRepository } from "../repository/usuario.repository.js";

export class UsuarioService {

    constructor(private usuarioRepository:UsuarioRepository){}

    async obtenerUsuarios(){
        return await this.usuarioRepository.findAllUsuarios();
    }

    async obtenerUsuario(id:number){
        return await this.usuarioRepository.findUsuarioById(id);
    }

    async crearUsuario(usuario:Usuario){
        const {nombre, apellido, mail, password, token, rol, verificado} = usuario;

        console.log(nombre);
        if(!nombre || typeof nombre !== 'string'){
            throw new Error('El nombre es obligatorio y debe ser un string')
        }
      
        return await this.usuarioRepository.createUsuario(usuario)
    }

   /* async actualizarUsuario(id:number, data: {nombre?:string,id_empresa?:number}){
        return await this.usuarioRepository.updateUsuario(id,data);
    }*/

    async eliminarUsuario(id:number){
        try {
            return await this.usuarioRepository.deleteUsuario(id);
        } catch (error:any) {
            if(error.code === 'P2025'){
                throw new Error('UsuarioNoExiste')
            }

            throw error;
        }
    }

}