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

    async getProductosDelCarritoDeUnUsuario(id: number) {
        return await prisma.carrito.findFirst({
            where: {
                usuario_id: id,  // Filtra por el ID del usuario
            },
            include: {
                carrito_producto: {  // Incluir los productos en el carrito
                    include: {
                        producto: true,  // Traemos los detalles del producto
                    }
                }
            }
        });
    }

    async postAgregarProductoAlCarrito(productoAAgregar: any) {
        const carrito = await prisma.carrito.findFirst({
            where: { usuario_id: productoAAgregar.usuarioId }
        });

        if (!carrito) {
            throw new Error("Carrito no encontrado para el usuario");
        }

        // Verifica si el producto ya está en el carrito
        const productoEnCarrito = await prisma.carrito_producto.findFirst({
            where: {
                carrito_id: carrito.id,
                producto_id: productoAAgregar.productoId
            }
        });

        if (productoEnCarrito) {
            const cantidadActual = productoEnCarrito.cantidad ?? 0;
            return await prisma.carrito_producto.update({
                where: { id: productoEnCarrito.id },
                data: { cantidad: cantidadActual + 1}
            });
        } else {
            return await prisma.carrito_producto.create({
                data: {
                    carrito_id: carrito.id,
                    producto_id: productoAAgregar.productoId,
                    cantidad: 1
                }
            });
        }
    }

    async postBorrarProductoDelCarrito(productoAAgregar: any) {
        const carrito = await prisma.carrito.findFirst({
            where: { usuario_id: productoAAgregar.usuarioId }
        });

        if (!carrito) {
            throw new Error("Carrito no encontrado para el usuario");
        }

        // Verifica si el producto ya está en el carrito
        const productoEnCarrito = await prisma.carrito_producto.findFirst({
            where: {
                carrito_id: carrito.id,
                producto_id: productoAAgregar.productoId
            }
        });

        if (productoEnCarrito) {
            const cantidadActual = productoEnCarrito.cantidad ?? 0;
            if (cantidadActual > 1) {
                return await prisma.carrito_producto.update({
                    where: {id: productoEnCarrito.id},
                    data: {cantidad: cantidadActual - 1}
                });
            } else {
                // Si la cantidad es 1, elimina el producto del carrito
                return await prisma.carrito_producto.delete({
                    where: {id: productoEnCarrito.id}
                });
            }
        }
    }

    async postVaciarCarrito(usuarioId: number) {
        const carrito = await prisma.carrito.findFirst({
            where: { usuario_id: usuarioId }
        });

        if (!carrito) {
            throw new Error("Carrito no encontrado para el usuario");
        }
        // Elimina todos los productos del carrito
        await prisma.carrito_producto.deleteMany({
            where: { carrito_id: carrito.id }
        });
    }
    

}