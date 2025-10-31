import type { Usuario } from "../models/usuario.model.js";
import type { UsuarioRepository } from "../repository/usuario.repository.js";
import * as bcrypt from 'bcrypt';

export class UsuarioService {

    constructor(private usuarioRepository:UsuarioRepository){}

    async obtenerUsuarios(){
        return await this.usuarioRepository.findAllUsuarios();
    }

    async obtenerUsuario(id:number){
        return await this.usuarioRepository.findUsuarioById(id);
    }

    async crearUsuario(usuarioData:Usuario){
        const {nombre, apellido, mail, password} = usuarioData;


        if (!nombre) throw new Error('Nombre es requerido');
        if (!apellido) throw new Error('Apellido es requerido');
        if (!mail) throw new Error('Mail es requerido');
        if (!password || password.length < 6) {
            throw new Error('Password debe tener al menos 6 caracteres');
  }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const usuario = {
            nombre: nombre,
            apellido: apellido,
            mail: mail,
            password: hashedPassword,
            rol: 'usuario',
            verificado: false,
            fechaIngreso: new Date()
        };

        const usuarioCreado = await this.usuarioRepository.createUsuario(usuario);

            
      
        return usuarioCreado;
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