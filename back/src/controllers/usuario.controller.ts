import {type usuario } from './../../node_modules/.prisma/client/index.js';

import { type Request, type Response } from "express";
import { UsuarioService } from "../services/usuario.service.js";
import { UsuarioRepository } from "../repository/usuario.repository.js";
import type { Usuario } from "../models/usuario.model.js";

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {

    constructor() { }


    public getUsuarios = async (req: Request, res: Response) => {
        try {
            const usuarios = await usuarioService.obtenerUsuarios();
            console.log(usuarios);
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuarios", error })
        }
    }

    public getUsuario = async (req: Request, res: Response) => {

        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json("ID inválido")
            }

            const usuario = await usuarioService.obtenerUsuario(id);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' })
            }

            res.status(200).json(usuario);


        } catch (error) {
            res.status(500).json({ message: "No se pudo obtener el usuario", error })
        }
    }


    public crearUsuario = async (req: Request, res: Response) => {
  try {
    const newUsuario: Usuario = req.body;

    const existe = await usuarioService.existeMail(newUsuario.mail!);

    if (existe) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const usuario = await usuarioService.crearUsuario(newUsuario);
    const carrito = await usuarioService.crearCarritoParaUsuario(usuario.id_usuario);
    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "No se pudo crear el usuario", error });
  }
};


    public verificarMail = async (req: Request, res: Response) => {

        const token = String(req.params.token);
        const { nombre, id_empresa } = req.body;

        try {
            const usuarioActualizado = await usuarioService.verificarMail(token)
            res.status(200).json({ message: "Mail verificado"});
        } catch (error) {
            res.status(500).json({ message: "No se pudo verificar el mail", error })
        }

    }

    public login = async (req: Request, res: Response) => {
        
        try {
            const {mail, password} = req.body;
            if(!mail || !password){
                return res.status(400).json({ 
                    error: 'Mail y password son requeridos' 
                });
            }        
            const usuarioLogeado = await usuarioService.login(mail, password)
            return res.status(200).json({
                success: true,
                token: usuarioLogeado.token,
                usuario: usuarioLogeado.usuario
            });
        } catch (error:any) {
            console.error('Error en login:', error);
            
            if (error.message === 'Usuario no encontrado' || 
                error.message === 'Contraseña incorrecta') {
                return res.status(401).json({ 
                    error: 'Credenciales inválidas' 
                });
            }
            
            if (error.message === 'Usuario no verificado') {
                return res.status(403).json({ 
                    error: 'Por favor verifica tu email antes de iniciar sesión' 
                });
            }

            return res.status(500).json({ 
                error: 'Error en el servidor' 
            });
        }
    }

    public eliminarUsuario = async (req: Request, res: Response) => {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json("ID inválido")
        }

        try {
            await usuarioService.eliminarUsuario(id);
            res.status(204).send();
        } catch (error:any) {
            if(error.message === "UsuarioNoExiste"){
                return res.status(404).json({message : "Usuario no encontrado"})
            }

            res.status(500).json({ message: "No se pudo eliminar el usuario", error })
        }
    }

    public getProductosDelCarritoDeUnUsuario = async (req: any, res: Response) => {
        try {
            console.log(req.user)
            const id = Number(req.params.id);
            console.log("ID del usuario autenticado:", id);
            console.log("🔹 Usuario decodificado del token:", req.user);

            const productos = await usuarioService.getProductosDelCarritoDeUnUsuario(id);
            console.log("Productos encontrados:", productos);

            if (!productos) {
                return res.status(404).json({ message: 'Productos no encontrados' });
            }

            res.status(200).json(productos);
        } catch (error) {
            console.error("Error en getProductosDelCarritoDeUnUsuario:", error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }

    public postAgregarProductoAlCarrito = async(req: any, res: Response) => {
        try {
            const id = Number(req.params.id);

            const productoAAgregar = { productoId: req.body.productoId,  usuarioId: id };

            const producto = await usuarioService.postAgregarProductoAlCarrito(productoAAgregar);
            res.status(201).json(producto);

        } catch (error) {
            console.error("Error en agregarProductoAlCarrito:", error);
            res.status(500).json({ message: 'Error al agregar el producto al carrito' });
        }
    }


    public postBorrarProductoDelCarrito = async(req: any, res: Response) => {
        try {
            const id = Number(req.params.id);

            const productoABorrar = { productoId: req.body.productoId, usuarioId: id  };

            const producto = await usuarioService.postBorrarProductoDelCarrito(productoABorrar);
            res.status(201).json(producto);

        } catch (error) {
            console.error("Error en borrarProductoDelCarrito:", error);
            res.status(500).json({ message: 'Error al borrar el producto del carrito' });
        }
    }

    public postVaciarCarrito = async(req: any, res: Response) => {
        try {
            const id = Number(req.params.id);

            await usuarioService.postVaciarCarrito(id);
            res.status(201).json({ message: 'Carrito vaciado correctamente' });

        } catch (error) {
            console.error("Error en vaciarCarrito:", error);
            res.status(500).json({ message: 'Error al vaciar el carrito' });
        }
    }
}