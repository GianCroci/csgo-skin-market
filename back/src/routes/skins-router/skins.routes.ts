import { Router } from "express";
import { SkinsController } from "../../controllers/skins.controller.js";

const skinsController = new SkinsController();
const skinsRouter = Router();


skinsRouter.get('/', skinsController.getSkins.bind(skinsController));
skinsRouter.get('/:id', skinsController.getSkinById.bind(skinsController));
skinsRouter.post('/', skinsController.actualizarSkin.bind(skinsController));
skinsRouter.delete('/:id', skinsController.eliminarSkin.bind(skinsController));



export default skinsRouter;