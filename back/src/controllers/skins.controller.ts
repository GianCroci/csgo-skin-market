import { type Request, type Response } from "express";
import { SkinsRepository } from "../repository/skins.repository.js";
import { SkinsService } from "../services/skins.service.js";

const skinsRepository= new SkinsRepository();
const skinsService= new SkinsService(skinsRepository);

export class SkinsController {

    constructor() { }

    public getSkins= async (req:Request ,res: Response) => {

        try {
            const skins= await skinsService.obtenerSkins();

            if(!skins){
                return res.status(404).json({message: 'No se encontraron skins'})
            }

            console.log(skins);
            res.status(200).json(skins);
            
        } catch (error) {
            res.status(500).json({ message: "Error al obtener skins", error })
        }
    }

    public getSkinById= async (req:Request ,res: Response) => {

        try {
            const id= Number(req.params.id);

            if(isNaN(id)){
                return res.status(400).json("ID inválido")
            }

            const getSkinById= await skinsService.obtenerSkinsById(id);

            if(!getSkinById){
                return res.status(404).json({message: 'Skin no encontrada'})
            }

            console.log(getSkinById);

            res.status(200).json(getSkinById);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener skin por id", error })
        }
    }


    public actualizarSkin= async (req:Request ,res: Response) => {

        const id = Number(req.params.id);
        const {nombre_skin,rareza, precio, url_imagen} = req.body;

        if(isNaN((id))) {
            return res.status(400).json("ID inválido");
        }

        try {

            const usuarioActualizado = await skinsService.actualizarSkin(id, nombre_skin, rareza , precio, url_imagen);
            console.log(usuarioActualizado);
            res.status(200).json(usuarioActualizado);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar skin", error })
        }
    }

    public eliminarSkin=async (req:Request ,res: Response) => {

        const id = Number(req.params.id);

        if(isNaN((id))) {
            return res.status(400).json("ID inválido");
        }
        if(!id) {
            return res.status(400).json("No existe el id");
        }

    }

}
