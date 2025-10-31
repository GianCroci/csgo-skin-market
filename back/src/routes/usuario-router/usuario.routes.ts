import {Router} from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/',usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.get('/:id',usuarioController.getUsuario.bind(usuarioController));
usuarioRouter.post('/',usuarioController.crearUsuario.bind(usuarioController));
//usuarioRouter.put('/:id',usuarioController.actualizarUsuario.bind(usuarioController));
usuarioRouter.delete('/:id',usuarioController.eliminarUsuario.bind(usuarioController));


export default usuarioRouter;