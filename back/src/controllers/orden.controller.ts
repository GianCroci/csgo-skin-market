
import { type Request, type Response } from "express";
import { OrdenRepository } from '../repository/orden.repository.js';
import { OrdenService } from '../services/orden.service.js';

const ordenRepository = new OrdenRepository();
const ordenService = new OrdenService(ordenRepository);

export class OrdenController {

    constructor() { }

    public async getOrdenesPorUsuario(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.idUsuario);
            const ordenes = await ordenService.obtenerOrdenesPorUsuario(usuarioId);
            res.json(ordenes);
        } catch (error: any) {
            console.error("Error en getOrdenesPorUsuario:", error.message);
            res.status(500).json({ error: "Error al obtener las órdenes del usuario" });
        }
    }

    public async getOrden(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const orden = await ordenService.obtenerOrden(id);
            if (!orden) return res.status(404).json({ error: "Orden no encontrada" });
            res.json(orden);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener el detalle de la orden" });
        }
    }



}