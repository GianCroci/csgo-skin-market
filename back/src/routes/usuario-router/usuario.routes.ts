import {Router} from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";
import { verificarToken } from "../../services/middlewares/auth.middleware.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();


usuarioRouter.post('/',usuarioController.crearUsuario.bind(usuarioController));
usuarioRouter.post('/login',usuarioController.login.bind(usuarioController));
usuarioRouter.put('/:token',usuarioController.verificarMail.bind(usuarioController));


usuarioRouter.delete('/:id', verificarToken, usuarioController.eliminarUsuario.bind(usuarioController));
usuarioRouter.get('/', verificarToken, usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.get('/:id', verificarToken, usuarioController.getUsuario.bind(usuarioController));

export default usuarioRouter;