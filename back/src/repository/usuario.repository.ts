import {type ubicacion } from './../../node_modules/.prisma/client/index.js';
import {type usuario } from './../../node_modules/.prisma/client/index.js';

import type { Usuario } from "../models/usuario.model.js";
import { prisma } from "../prisma.js";

export class UsuarioRepository{

    async findAllUsuarios(){
        return await prisma.usuario.findMany()
    }

    async findUsuarioById(id:number){
        return await prisma.usuario.findUnique(
            {
                where : {id_usuario : id}
            }
        )
    }

    async findUsuarioByMail(mail: string){
        return await prisma.usuario.findUnique(
            {
                where: {mail : mail}
            }
        )
    }

    async findUbicacion(id: number){
        return await prisma.ubicacion.findUnique(
            {
                where: {id_ubicacion : id}
                
            }
        )
    }

    async createUbicacion(ubicacion : { direccion: string; localidad: string; provincia: string; pais: string }){
        return await prisma.ubicacion.create({
            data : {
                direccion: ubicacion.direccion!,
                localidad: ubicacion.localidad!,
                provincia: ubicacion.provincia!,
                pais: ubicacion.pais!
            }
        })
    }

    async createUsuario(usuario : Usuario){
        return await prisma.usuario.create({
            data: {
            nombre: usuario.nombre!,
            apellido: usuario.apellido!,
            mail: usuario.mail!,
            password: usuario.password!,
            token: usuario.token!,
            rol: usuario.rol!,
            verificado: usuario.verificado!,
            ubicacion_id: usuario.ubicacion_id!
        }
        })
    }

    async updateUsuario(id_usuario:number,  usuario : Usuario){
        return await prisma.usuario.update({
            where : {id_usuario},
            data : usuario
        })
    }

    async deleteUsuario(id:number){
        return await prisma.usuario.delete({
            where : {id_usuario : id}
        })
    }

    async verificarMail(token: string){
        return await prisma.usuario.update({
            where: {token},
            data : {verificado : true}

        })
    }
    

}