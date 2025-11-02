import type { Usuario } from "../models/usuario.model.js";
import type { UsuarioRepository } from "../repository/usuario.repository.js";
import * as bcrypt from 'bcrypt';
import { EmailService } from "./email.service.js";

export class UsuarioService {

    private emailService: EmailService;

    constructor(private usuarioRepository:UsuarioRepository){
        this.emailService = new EmailService;
    }

    async obtenerUsuarios(){
        return await this.usuarioRepository.findAllUsuarios();
    }

    async obtenerUsuario(id:number){
        return await this.usuarioRepository.findUsuarioById(id);
    }

    async existeMail(mail: string){
        const existe = await this.usuarioRepository.findUsuarioByMail(mail);
        if(existe){
            return true;
        }
        return false;
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
        const token = Math.random().toString(36).substring(2, 2 + 10);

        const usuario = {
            nombre: nombre,
            apellido: apellido,
            mail: mail,
            password: hashedPassword,
            token: token,
            rol: 'usuario',
            verificado: false,
            fechaIngreso: new Date()
        };


        
        const usuarioCreado = await this.usuarioRepository.createUsuario(usuario);
        
            try {
                await this.emailService.enviarTokenDeVerificacion(usuario.mail, usuario.token);
            } catch (error) {
                console.error("Error al enviar el email:", error);
            }
    
        return usuarioCreado;
    }

    async verificarMail(token: string){
        return await this.usuarioRepository.verificarMail(token);
    }

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

    async login(mail: string, password: string){
        const usuario = await this.usuarioRepository.findUsuarioByMail(mail);

        if (!usuario) {
        throw new Error('Usuario no encontrado');
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.password)

        if (!passwordCorrecta) {
        throw new Error('Contraseña incorrecta');
        }

        if (!usuario.verificado==true){
            throw new Error('Usuario no verificado');
        }

        return usuario;
    }

}