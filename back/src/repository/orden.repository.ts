import { prisma } from "../prisma";

export class OrdenRepository {

    async findOrdenesByUser(usuarioId:number){
        const ordenes =  await prisma.ordenes.findMany({
            where: { id_usuario: usuarioId },
        });

        if (!ordenes) return null;
        
        return ordenes;
    }

    async findOrderDetailById(id: number) {
        const orden = await prisma.ordenes.findUnique({
            where: { id_orden: id }
        });
        if (!orden) return null;

        // Buscar las skins según los IDs almacenados
        const skins = await prisma.skins.findMany({
        where: { id_skin: { in: orden.skins_ids } },
        include: { armas: true },
        });

        // Devolver la orden con las skins asociadas
        return { ...orden, skins };
    } 

}