import {Router} from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/',usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.get('/:id',usuarioController.getUsuario.bind(usuarioController));
usuarioRouter.post('/',usuarioController.crearUsuario.bind(usuarioController));
usuarioRouter.post('/login',usuarioController.login.bind(usuarioController));
usuarioRouter.put('/:token',usuarioController.verificarMail.bind(usuarioController));
usuarioRouter.delete('/:id',usuarioController.eliminarUsuario.bind(usuarioController));


export default usuarioRouter;