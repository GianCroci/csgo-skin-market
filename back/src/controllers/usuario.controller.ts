
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

    public existeMail = async (req: Request, res: Response) => {

        try {
            const mail = String(req.params.mail);

            const existeMail = await usuarioService.existeMail(mail);

            if (!existeMail) {
                
                 res.status(200).json(existeMail);
                 return false;
            }
            
            res.status(404).json({ message: 'El mail ya esta registrado' })
            return true
           


        } catch (error) {
            res.status(500).json({ message: "No se pudo obtener el usuario", error })
        }
    }

    public crearUsuario = async (req: Request, res: Response) => {
        try {
            const newUsuario:Usuario = req.body
            
            const usuario = await usuarioService.crearUsuario(newUsuario);
            res.status(201).json(usuario)
        } catch (error) {
            res.status(500).json({ message: "No se pudo crear el usuario", error })
        }
    }

    /*public actualizarUsuario = async (req: Request, res: Response) => {

        const id = Number(req.params.id);
        const { nombre, id_empresa } = req.body;

        if (isNaN(id)) {
            return res.status(400).json("ID inválido")
        }

        try {
            const usuarioActualizado = await usuarioService.actualizarUsuario(id, { nombre, id_empresa })
            res.status(200).json(usuarioActualizado);
        } catch (error) {
            res.status(500).json({ message: "No se pudo actualizar el usuario", error })
        }

    }*/

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

}