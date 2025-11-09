import {type ubicacion } from './../../node_modules/.prisma/client/index.js';
import type { Usuario } from "../models/usuario.model.js";
import type { UsuarioRepository } from "../repository/usuario.repository.js";
import * as bcrypt from 'bcrypt';
import { EmailService } from "./email.service.js";
import jwt from 'jsonwebtoken';

export class UsuarioService {

    private emailService: EmailService;
    private JWT_SECRET : string;

    constructor(private usuarioRepository:UsuarioRepository){
        this.emailService = new EmailService;

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET no está definido en las variables de entorno');
        }
        
        this.JWT_SECRET = process.env.JWT_SECRET;
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
        const {nombre, apellido, mail, password, direccion, localidad, provincia, pais} = usuarioData;


        if (!nombre) throw new Error('Nombre es requerido');
        if (!apellido) throw new Error('Apellido es requerido');
        if (!mail) throw new Error('Mail es requerido');
        if (!password || password.length < 6) {
            throw new Error('Password debe tener al menos 6 caracteres');
  }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const token = Math.random().toString(36).substring(2, 2 + 10);

        const ubicacion = {
            direccion: direccion!,
            localidad: localidad!,
            provincia: provincia!,
            pais: pais!
        }

        const ubicacionCreada = await this.usuarioRepository.createUbicacion(ubicacion);

        const usuario = {
            nombre: nombre,
            apellido: apellido,
            mail: mail,
            password: hashedPassword,
            token: token,
            rol: 'usuario',
            verificado: false,
            fechaIngreso: new Date(),
            ubicacion_id: ubicacionCreada.id_ubicacion
        };


        
        const usuarioCreado = await this.usuarioRepository.createUsuario(usuario);
        
            try {
                await this.emailService.enviarTokenDeVerificacion(usuario.mail, usuario.token);
            } catch (error) {
                console.error("Error al enviar el email:", error);
            }
    
        return usuarioCreado;
    }

    async crearCarritoParaUsuario(usuarioId: number) {
        return await this.usuarioRepository.createCarrito(usuarioId);
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

        
            console.log('=== DEBUG UBICACION ===');
        console.log('usuario.ubicacion_id:', usuario?.ubicacion_id);
        console.log('tipo:', typeof usuario?.ubicacion_id);

        const ubicacion = await this.usuarioRepository.findUbicacion(Number(usuario?.ubicacion_id));

        console.log('ubicacion resultado:', ubicacion);
        console.log('=== FIN DEBUG ===');
        
        
        
        
        

        if (!usuario) {
        throw new Error('Usuario no encontrado');
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.password)

        if (!passwordCorrecta) {
        throw new Error('Contraseña incorrecta');
        }

        if (!usuario.verificado){
            throw new Error('Usuario no verificado');
        }

        const token = jwt.sign(
            { 
                id_usuario: usuario.id_usuario,
                mail: usuario.mail,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                rol: usuario.rol,
                provincia: ubicacion?.provincia,
                pais: ubicacion?.pais
                 
            },
            this.JWT_SECRET,
            { expiresIn: '24h' } 
        );

    
        return {
            token,
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                mail: usuario.mail,
                rol: usuario.rol,
                provincia: ubicacion?.provincia,
                pais: ubicacion?.pais
                 
            }


        
    }

    }

    async getProductosDelCarritoDeUnUsuario(id: number) {
        return await this.usuarioRepository.getProductosDelCarritoDeUnUsuario(id);
    }

    async postAgregarProductoAlCarrito(productoAAgregar: any) {
        return await this.usuarioRepository.postAgregarProductoAlCarrito(productoAAgregar);
    }

    async postBorrarProductoDelCarrito(productoABorrar: { productoId: any; usuarioId: number }) {
        return await this.usuarioRepository.postBorrarProductoDelCarrito(productoABorrar);
    }

    async postVaciarCarrito(usuarioId: number) {
        return await this.usuarioRepository.postVaciarCarrito(usuarioId);
    }
}