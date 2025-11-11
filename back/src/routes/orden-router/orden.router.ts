import { OrdenController } from './../../controllers/orden.controller.js';
import { Router } from "express";

const ordenController = new OrdenController();
const ordenRouter = Router();

//aqui va el create
ordenRouter.get('/usuario/:idUsuario', ordenController.getOrdenesPorUsuario.bind(ordenController)); // más claro
ordenRouter.get('/:id', ordenController.getOrden.bind(ordenController));


export default ordenRouter;