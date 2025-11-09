import { tipo_rareza } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";
import type { SkinsRepository } from "../repository/skins.repository.js";



export class SkinsService {

    constructor(private skinsRepository:SkinsRepository) { }

    async obtenerSkins(){
        return await this.skinsRepository.findAllSkins();
    }

    async obtenerSkinsById(id:number){
        return await this.skinsRepository.findSkinsById(id);
    }

    async actualizarSkin(id:number, nombre_skin:string ,rareza : tipo_rareza ,precio: number, url_imagen:string){
        return await this.skinsRepository.updateSkin(id, nombre_skin,rareza, precio, url_imagen);
    }

}