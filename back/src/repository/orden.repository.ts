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
            select: {
                id_skin: true,
                nombre_skin: true,
                precio: true,
                url_imagen: true
            }
        });

        // Devolver la orden con las skins asociadas (sin skins_ids)
        const { skins_ids, ...ordenSinIds } = orden;

        return { ...ordenSinIds, skins };
    } 

    async createOrder(usuarioId:number, idsSkins:number[],totalCarrito:number){
        const nuevaOrden = await prisma.ordenes.create({
            data: {
                id_usuario: usuarioId,
                fecha: new Date(),
                estado: 'Abierta',
                total: totalCarrito,
                skins_ids: idsSkins
            }
        });
        return nuevaOrden;
    }

}