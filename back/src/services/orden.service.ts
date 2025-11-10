import type { OrdenRepository } from "../repository/orden.repository.js";

export class OrdenService{
 
    constructor(private ordenRepository:OrdenRepository){}

    async obtenerOrdenesPorUsuario(userId:number){
        return await this.ordenRepository.findOrdenesByUser(userId);
    }

    async obtenerOrden(id:number){
        return await this.ordenRepository.findOrderDetailById(id);
    }


}