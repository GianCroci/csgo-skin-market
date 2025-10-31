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

    async createUsuario(usuario : Usuario){
        return await prisma.usuario.create({
            data: {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            mail: usuario.mail,
            password: usuario.password,
            token: usuario.token,
            rol: usuario.rol,
            verificado: usuario.verificado
        }
        })
    }

    async updateUsuario(id:number,  usuario : Usuario){
        return await prisma.usuario.update({
            where : {id},
            usuario
        })
    }

    async deleteUsuario(id:number){
        return await prisma.usuario.delete({
            where : {id}
        })
    }
    

}