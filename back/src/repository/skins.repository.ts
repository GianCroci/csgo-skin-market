import type { tipo_rareza } from "@prisma/client";
import { prisma } from "../prisma.js";

export class SkinsRepository{

    async findAllSkins(){
        return await prisma.skins.findMany()
    }

    async findSkinsById(id:number){
        return await prisma.skins.findUnique(
            {
            where:{id_skin : id}
        })
    }

    async updateSkin(id:number, nombre_skin:string,rareza:tipo_rareza, precio:number, url_imagen:string){
        return await prisma.skins.update({
            where:{id_skin: id},
            data:{
                nombre_skin,
                rareza,
                precio,
                url_imagen
            }
        })
    }
}